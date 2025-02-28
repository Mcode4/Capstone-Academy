from app.models import db, SiteReview, environment, SCHEMA
from sqlalchemy.sql import text

def seed_site_reviews():
    demo = SiteReview(
        first_name = 'M',
        last_name = 'Armstrong',
        review = 'Had fun making it',
        rating = 5
    )

    db.session.add(demo)
    db.session.commit()

def undo_site_reviews():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.site_reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM site_reviews"))
    
    db.session.commit()