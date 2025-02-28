from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(25), nullable=False)
    last_name = db.Column(db.String(25))
    username = db.Column(db.String(25), nullable=False, unique=True)
    image = db.Column(db.String, nullable=False)
    email = db.Column(db.String(50), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    bio = db.Column(db.String(250))
    createdAt = db.Column(db.DateTime, default=datetime.datetime.now())
    updatedAt = db.Column(db.DateTime, default=datetime.datetime.now(), onupdate=datetime.datetime.now())

    courses = db.relationship('Course', back_populates='users')
    comments =  db.relationship('Comment', back_populates='users')
    # notifications = db.relationship('Notification', back_populates='users')
    


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'username': self.username,
            'email': self.email,
            'bio': self.bio,
            'image': self.image,
            'createdDate': self.createdAt,
            # 'courses': self.courses,
            # 'comments': self.comments,
            # 'notifications': self.notifications
        }
