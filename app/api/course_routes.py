from flask import Blueprint
from app.models import Course
from sqlalchemy.orm import joinedload

course_routes = Blueprint("course", __name__)

@course_routes.route('/')
def get_courses():
    courses = Course.query.options(joinedload(Course.users), joinedload(Course.pages), joinedload(Course.comments)).all()
    return {"courses": [course.to_dict() for course in courses]}