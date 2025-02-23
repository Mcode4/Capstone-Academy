from flask import Blueprint, request
from app.models import Course, db
from app.forms import CourseForm
from .img_helper_funcs import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from sqlalchemy import desc

course_routes = Blueprint("course", __name__)

@course_routes.route('/')
def get_courses():
    # courses = Course.query.options(joinedload(Course.users), joinedload(Course.pages), joinedload(Course.comments)).all()
    courses = Course.query.all()
    return {"courses": {course.id : course.to_dict() for course in courses}}

@course_routes.route('/featured')
def featured_courses():
    courses = Course.query.order_by(desc(Course.rating), Course.name).limit(10).all()
    return {"courses": [course.to_dict() for course in courses]}

@course_routes.route('/', methods=['POST'])
def create_course():
    # form.data['csrf_token'] = request.cookies['csrf_token']
    form = CourseForm()
    print('\n FORM INFO: ', form.data, '\n')
    print('\n CSRF: ', request.data, '\n')
    if form.validate_on_submit():
        image = form.data["image"]
        image.name = get_unique_filename(image.name)
        upload = upload_file_to_s3

        if "url" not in upload:
            return {"error": "File didn't upload please try again"}
        
        url = upload["url"]
        new = Course(
            owner_id = form.data['owner_id'],
            name = form.data['name'],
            category = form.data['category'],
            description = form.data['description'],
            image = url
        )
        db.session.add(new)
        db.session.commit()
        return new.to_dict(), 201
    return form.errors

@course_routes.route('/<int:id>')
def get_courses_by_id(id):
    # courses = Course.query.options(joinedload(Course.users), joinedload(Course.pages), joinedload(Course.comments)).all()
    courses = Course.query.filter(Course.owner_id == id).all()
    return {"courses": [course.to_dict() for course in courses]}