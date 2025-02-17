from .db import db, environment, SCHEMA, add_prefix_for_prod

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {"schema" : SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    rating = db.Column(db.Integer, nullable=False)

    users = db.relationship('User', back_populates='comments')
    courses = db.relationship('Course', back_populates='comments')