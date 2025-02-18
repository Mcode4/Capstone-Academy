from .db import db, environment, SCHEMA, add_prefix_for_prod
from enum import Enum

class Types(Enum):
    TEXT = "TEXT"
    IMAGE = "IMAGE"
    VIDEO = "VIDEO"

class PageContent(db.Model):
    __tablename__ = 'page_contents'

    if environment == "production":
        __table_args__ = {"schema" : SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    page_id = db.Column(db.ForeignKey(add_prefix_for_prod('pages.id')), nullable=False)
    types = db.Column(db.Enum(Types), nullable=False)
    if types == "TEXT":
        content = db.Column(db.String(500), nullable=False)
    else:
        content = db.Column(db.String, nullable=False)
        
    pages = db.relationship('Page', back_populates="page_contents")

        
