from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime

class SiteReview(db.Model):
    __tablename__ = 'site_reviews'

    if environment == "production":
        __table_args__ = {"schema" : SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(25), nullable=False)
    last_name = db.Column(db.String(25))
    rating = db.Column(db.Integer, nullable=False)
    review = db.Column(db.String(125), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "rating": self.rating,
            "review": self.review,
        }