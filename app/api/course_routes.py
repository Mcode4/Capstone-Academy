from flask import Blueprint
from app.models import Course
from sqlalchemy import desc

course_routes = Blueprint("course", __name__)

@course_routes.route('/')
def get_courses():
    # courses = Course.query.options(joinedload(Course.users), joinedload(Course.pages), joinedload(Course.comments)).all()
    courses = Course.query.all()
    return {"courses": [course.to_dict() for course in courses]}

@course_routes.route('/featured')
def featured_courses():
    courses = Course.query.order_by(desc(Course.rating), Course.name).limit(10).all()
    return {"courses": [course.to_dict() for course in courses]}