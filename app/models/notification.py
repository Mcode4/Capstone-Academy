from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime

class Notification(db.Model):
    __tablename__ = 'notifications'

    if environment == "production":
        __table_args__ = {"schema" : SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    message = db.Column(db.String)
    createdAt = db.Column(db.DateTime, default=datetime.datetime.now())
    updatedAt = db.Column(db.DateTime, default=datetime.datetime.now(), onupdate=datetime.datetime.now())

    users = db.relationship('User', back_populates='notifications')