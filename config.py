import os
from sqlalchemy import URL


# Grabs the folder where the script runs.
basedir = os.path.abspath(os.path.dirname(__file__))

# Enable debug mode.
DEBUG = True

url_object = URL.create(
    "postgresql",
    username="postgres",
    password="admin",
    host="localhost",
    database="cardart_db"
)

SQLALCHEMY_DATABASE_URI = url_object