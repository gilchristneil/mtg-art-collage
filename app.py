from flask import Flask, request
from models import db_session, Card, Base
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Select

app = Flask(__name__)
app.config.from_object('config')

db = SQLAlchemy(app, model_class=Base)

@app.teardown_request
def shutdown_session(exception=None):
    db_session.remove()


@app.route("/cards", methods=['GET'])
def get_all_cards():

    ###
    # parameter_object = {
    #     'artist': bool,
    #     'set': bool,
    # }
    ##
    

    page = request.args.get('page', 1, type=int)
    sort_by = request.args.get('sort_by', None, type=str)
    sort_dir = request.args.get('sort_dir', None, type = str)
    page_size = request.args.get('page_size', 8, type=int)
    group_by = request.args.get('group_by', None, type=str)


    ##create select statement from query parameters
    db_select: Select[any] = db.select(Card)
    if (sort_by != None and sort_dir != None):
        db_select = db_select.order_by(getattr(getattr(Card,sort_by), sort_dir)())
    else:
        db_select = db_select.order_by(Card.name)
    
    if (group_by != None):
        db_select = db_select.group_by(getattr(Card, group_by))


    cards = db.paginate(
                        db_select,
                        page=page,
                        per_page = page_size                        
                        )
                    

    response = {
        'cards': [{'id': str(card.id), 'name': card.name} for card in cards.items],          
        'total': cards.total,
        'page': cards.page,
        'pages': cards.pages
    }

    return str(response)


#purpose is to help the autocomplete when searching 
##caching it all on client side on initial load
@app.route("/search_help", methods=['GET'])
def get_search_help():

    artists = get_all_artists()
    mtg_sets = get_all_mtg_sets()

    return {
        'artists': artists,
        'sets': mtg_sets
    }


def get_all_artists():
    return db.session.execute(db.select(Card.artist).distinct()).scalars().all()

def get_all_mtg_sets():
    return db.session.execute(db.select(Card.mtg_set).distinct()).scalars().all()