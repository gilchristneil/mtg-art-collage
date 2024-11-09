from __future__ import annotations
from typing import List
import uuid
from sqlalchemy import create_engine, String, ForeignKey, URL, ARRAY, Integer, LargeBinary
from sqlalchemy_utils import database_exists, create_database
from sqlalchemy.orm import mapped_column, Mapped, relationship, scoped_session, sessionmaker
from sqlalchemy.dialects.postgresql import UUID, ARRAY
from sqlalchemy.ext.declarative import declarative_base


url_object = URL.create(
    "postgresql",
    username="postgres",
    password="admin",
    host="localhost",
    database="cardart_db"
)

db_engine = create_engine(url_object)
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=db_engine))

Base = declarative_base()
Base.query = db_session.query_property()

##type_line and keywords dont populate due to just being art cards
##maybe later we do another call for the keyword and types?
class Card(Base):
    __tablename__ = "cards"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String)
    mtg_set: Mapped[str] = mapped_column(String)
    artist: Mapped[str] = mapped_column(String)
    image_uri: Mapped[str] = mapped_column(String)
    type_line: Mapped[str] = mapped_column(String)
    keyword_array: Mapped[List[str]] = mapped_column(ARRAY(String))
    pyramids: Mapped[List["Pyramids"]] = relationship(back_populates="card")

class Pyramids(Base):
    __tablename__ ="card_pyramids"
    id: Mapped[uuid.UUID] = mapped_column(primary_key=True)
    card_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("cards.id"))
    card: Mapped[Card] = relationship(back_populates="pyramids")
    level_1: Mapped[bytes] = mapped_column(LargeBinary)
    level_2: Mapped[bytes] = mapped_column(LargeBinary)
    level_3: Mapped[bytes] = mapped_column(LargeBinary)

Base.metadata.create_all(bind=db_engine)