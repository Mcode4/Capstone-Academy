from flask import Blueprint, jsonify
# from flask_login import login_required
from sqlalchemy.orm import joinedload
from app.models import User
from flask_cors import CORS

user_routes = Blueprint('users', __name__)

@user_routes.route('/')
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    # users = User.query.options(joinedload(User.courses), joinedload(User.comments), joinedload(User.notifications)).all()
    users = User.query.all()
    # print('\n USERS', users)
    # print('2!!!!:', [user.to_dict() for user in users], '\n')
    return {'users': {user.id : user.to_dict() for user in users}}


@user_routes.route('/<int:id>')
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()
