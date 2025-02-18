from .db import db, environment, SCHEMA, add_prefix_for_prod

class Page(db.Model):
    __tablename__ = 'pages'

    if environment == "production":
        __table_args__ = {"schema" : SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.ForeignKey(add_prefix_for_prod('courses.id')), nullable=False)
    index = db.Column(db.Integer, nullable=False)

    courses = db.relationship('Course', back_populates="pages")
    page_contents = db.relationship('PageContent', back_populates="pages")