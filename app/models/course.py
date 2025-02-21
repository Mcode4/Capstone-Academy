from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import Numeric
from enum import Enum
import datetime

class Category(Enum):
    CODING = "CODING"
    MATH = "MATH"
    SCIENCE = "SCIENCE"
    LANGUAGE = "LANGUAGE"
    FUN = "FUN"

class Course(db.Model):
    __tablename__ = 'courses'

    if environment == "production":
        __table_args__ = {"schema" : SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    category = db.Column(db.Enum(Category), nullable=False)
    description = db.Column(db.String(250), nullable=False)
    image = db.Column(db.String, nullable=False)
    rating = db.Column(Numeric(1, 2), nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.datetime.now())
    updatedAt = db.Column(db.DateTime, default=datetime.datetime.now(), onupdate=datetime.datetime.now())

    users = db.relationship('User', back_populates='courses')
    # pages = db.relationship('Page', back_populates='courses')
    comments = db.relationship('Comment', back_populates='courses')

    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.owner_id,
            'name': self.name,
            'category': f'{self.category.value}',
            'description': self.description,
            'image': self.image,
            'rating': float(self.rating),
            'createdDate': self.createdAt,
        }