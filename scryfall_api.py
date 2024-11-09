import scrython
import time
import requests
import pickle
import uuid
from generate_pyramids import get_pyramid
from models import Card, Pyramids, db_engine
from sqlalchemy.orm import sessionmaker

def get_all_pages():
    page_count = 1
    all_data = []
    # while True:
    time.sleep(0.5)
    page = scrython.cards.Search(q="layout=art_series", page=page_count, format="image", face="front")
    all_data = all_data + page.data()
        # page_count += 1
        # if not page.has_more():
        #     break

    return all_data

def get_all_cards(card_array, generate_pyramids=True):
    engine = db_engine
    Session =sessionmaker(engine)
    with Session() as session:
        for c in card_array:
            time.sleep(0.5)
            card = scrython.cards.Id(id=c['id'])

            image_req = requests.get(card.scryfallJson['card_faces'][0]['image_uris']['png'])
            if (image_req.ok):
                simple_card = Card(
                    id = card.scryfallJson['id'],
                    name = card.scryfallJson['name'],
                    mtg_set = card.scryfallJson['set'],
                    artist = card.scryfallJson['artist'],
                    type_line = card.scryfallJson['type_line'],
                    keyword_array= card.scryfallJson['keywords'],
                    image_uri =  card.scryfallJson['card_faces'][0]['image_uris']['png']
                )

                session.add(simple_card)
            
                # if (generate_pyramids == True):
                #     levels = get_pyramid(image_req.content)

                #     pyramid = Pyramids(
                #         id= str(uuid.uuid4()),
                #         card_id= card.scryfallJson['id'],
                #         level_1= pickle.dumps(levels['level_1']),
                #         level_2= pickle.dumps(levels['level_2']),
                #         level_3= pickle.dumps(levels['level_3']),                    
                #     )           

                # session.add(pyramid)
                session.commit()
           


card_list = get_all_pages()
get_all_cards(card_list)
