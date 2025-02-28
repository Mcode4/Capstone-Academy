from flask import Blueprint, request
from app.models import Course, db
from app.forms import CourseForm
from app.models.course import Category
from .img_helper_funcs import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from sqlalchemy import desc

course_routes = Blueprint("course", __name__)

@course_routes.route('')
def get_courses():
    # courses = Course.query.options(joinedload(Course.users), joinedload(Course.pages), joinedload(Course.comments)).all()
    courses = Course.query.all()
    return {"courses": {course.id : course.to_dict() for course in courses}}

@course_routes.route('/featured')
def featured_courses():
    courses = Course.query.order_by(desc(Course.name)).limit(4).all()
    return {"courses": [course.to_dict() for course in courses]}

@course_routes.route('/<int:id>')
def get_courses_by_owner_id(id):
    # courses = Course.query.options(joinedload(Course.users), joinedload(Course.pages), joinedload(Course.comments)).all()
    courses = Course.query.filter(Course.owner_id == id).all()
    return {"courses": [course.to_dict() for course in courses]}

@course_routes.route('/category/<id>')
def get_courses_by_category(id):
    # courses = Course.query.options(joinedload(Course.users), joinedload(Course.pages), joinedload(Course.comments)).all()
    print(f'\n ID COMING IN: {id} \n')
    catergor = None
    if id == 'coding':
        catergor = Category.CODING
    if id == 'math':
        catergor = Category.MATH
    if id == 'science':
        catergor = Category.SCIENCE
    if id == 'language':
        catergor = Category.LANGUAGE
    if id == 'fun':
        catergor = Category.FUN

    print(f'\n CATERGORY AFTER CHECK: {catergor} \n')

    if catergor is not None:
        courses = Course.query.filter(Course.category == catergor).all()
        print(f'\n Courses: {courses} \n')
        if courses:
            return {"courses": [course.to_dict() for course in courses]}, 200 
    return {"message": "Category not found"}, 404

@course_routes.route('', methods=['POST'])
def create_course():
    form = CourseForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print('\n FORM INFO: ', form.data, '\n')
    print('\n CSRF: ', request.data, '\n')
    if form.validate_on_submit():
        image = form.data["image"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        print('\n UPLOAD', upload, '\n')

        if "url" not in upload:
            return {"error": "File didn't upload please try again"}
        
        url = upload["url"]
        new = Course(
            owner_id = form.data['owner_id'],
            name = form.data['name'],
            category = form.data['category'],
            description = form.data['description'],
            image = url,
            # rating = 0
        )
        db.session.add(new)
        db.session.commit()
        return new.to_dict(), 201
    return form.errors, 400

@course_routes.route('/edit/<int:id>', methods=['PUT', 'PATCH'])
def edit_course(id):
    course = Course.query.get(id)
    if course is None:
        return {"message": "Course not found"}, 404
    form = CourseForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print('\n FORM INFO: ', form.data, '\n')
    if form.validate_on_submit():
        remove_file_from_s3(course.image)
        new_image = form.data['image']
        new_image.filename = get_unique_filename(new_image.filename)
        upload = upload_file_to_s3(new_image)
        print('\n UPLOAD', upload, '\n')
        
        if "url" not in upload:
            return {"error": "Failed to upload new image"}, 500
        
        for key, val in form.data.items():
            if(hasattr(course, key) and val != None):
                setattr(course, key, val)
        course.image = upload["url"]
        
        db.session.add(course)
        db.session.commit()
        return course.to_dict(), 200
    return form.errors, 400

@course_routes.route('/<int:id>', methods=['DELETE'])
def delete_course(id):
    course = Course.query.get(id)
    print('\n COURSE INFO: ', course, '\n')
    if course is None:
        return {"message": "Course not found"}, 404
    db.session.delete(course)
    db.session.commit()
    return {"message": "course successfully deleted"}, 200
    