from flask import Blueprint, request
from app.models import Comment, db
from app.forms import CommentForm
from sqlalchemy import desc

comment_routes = Blueprint("comment", __name__)

@comment_routes.route('/course/<int:id>')
def get_course_comments(id):
    comments = Comment.query.filter(Comment.course_id == id).all()
    return {'comments': [comment.to_dict() for comment in comments]}

@comment_routes.route('/user/<int:id>')
def get_user_comments(id):
    comments = Comment.query.filter(Comment.owner_id == id).all()
    return {'comments': [comment.to_dict() for comment in comments]}

@comment_routes.route('/', methods=['POST'])
def add_comment():
    form = CommentForm()
    # form.data['csrf_token'] = request.cookies['csrf_token']
    print('\n FORM INFO: ', form.data, '\n')
    print('\n FORM INFO: ', request.cookies['csrf_token'], '\n')
    if form.validate_on_submit():
        print('VALIDATED')
        new = Comment(
            owner_id = form.data['owner_id'],
            course_id = form.data['course_id'],
            rating = form.data['rating'],
            comment = form.data['comment']
        )
        db.session.add(new)
        db.session.commit()
        return new.to_dict()
    return form.errors, 400