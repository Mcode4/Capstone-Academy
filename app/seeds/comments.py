from app.models import db, Comment, environment, SCHEMA
from enum import Enum
from sqlalchemy.sql import text

def seed_comments():
    demo = Comment(
        owner_id = 2,
        course_id = 1,
        comment = 'Sux',
        rating = 1
    )
    demo2 = Comment(
        owner_id = 1,
        course_id = 1,
        comment = 'Agreed',
        rating = 2
    )

    db.session.add(demo)
    db.session.add(demo2)
    db.session.commit()

def undo_comments():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))
    
    db.session.commit()