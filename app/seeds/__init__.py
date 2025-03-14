from flask.cli import AppGroup
from .users import seed_users, undo_users
from .courses import seed_courses, undo_courses
from .comments import seed_comments, undo_comments
# from .pages import seed_pages, undo_pages
from .site_reviews import seed_site_reviews, undo_site_reviews

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_courses()
        undo_comments()
        # undo_pages()
        undo_site_reviews()
    seed_users()
    seed_courses()
    seed_comments()
    # seed_pages()
    seed_site_reviews()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_courses()
    undo_comments()
    # undo_pages()
    undo_site_reviews()
    # Add other undo functions here
