from app.models import db, Course, environment, SCHEMA
from app.models.course import Category
from enum import Enum
from sqlalchemy.sql import text

def seed_courses():
    demo = Course(
        owner_id = 1,
        name = 'Demo Course',
        category = Category.FUN,
        description = 'for test',
        image= 'https://media.istockphoto.com/id/1400865154/photo/insurance-and-risk-management-concept.jpg?s=612x612&w=0&k=20&c=qYIonj5JRDaBZHtJ0oMXJTCazwI2bUw_T7NBFq4rjn4=',
        rating = 5.0
    )

    db.session.add(demo)
    db.session.commit()

def undo_courses():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.courses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM courses"))
    
    db.session.commit()