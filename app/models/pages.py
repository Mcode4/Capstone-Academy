from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime

class Page(db.Model):
    __tablename__ = 'pages'

    if environment == "production":
        __table_args__ = {"schema" : SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.ForeignKey(add_prefix_for_prod('courses.id')), nullable=False, index=True)
    createdAt = db.Column(db.DateTime, default=datetime.datetime.now())
    updatedAt = db.Column(db.DateTime, default=datetime.datetime.now(), onupdate=datetime.datetime.now())

    courses = db.relationship('Course', back_populates="pages")
    # page_contents = db.relationship('PageContent', back_populates="pages")

    def to_dict(self):
        return {
            'id': self.id,
            'courseId': self.course_id,
            'createdDate': self.createdAt,
        }