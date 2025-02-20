from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {"schema" : SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    course_id = db.Column(db.ForeignKey(add_prefix_for_prod('courses.id')), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(125), nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.datetime.now())
    updatedAt = db.Column(db.DateTime, default=datetime.datetime.now(), onupdate=datetime.datetime.now())

    users = db.relationship('User', back_populates='comments')
    courses = db.relationship('Course', back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.owner_id,
            'courseId': self.course_id,
            'rating': self.rating,
            'comment': self.comment,
            'createdDate': self.createdAt,
        }