from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo',
        last_name='User',
        username='demo-user',
        email='demo@aa.io', 
        password='password',
        image = 'https://media.istockphoto.com/id/1393750072/vector/flat-white-icon-man-for-web-design-silhouette-flat-illustration-vector-illustration-stock.jpg?s=612x612&w=0&k=20&c=s9hO4SpyvrDIfELozPpiB_WtzQV9KhoMUP9R9gVohoU='
    )
    demo2 = User(
        first_name='Made2',
        last_name='Collide',
        username='collide-user',
        email='collide@aa.io', 
        password='password',
        image = 'https://media.istockphoto.com/id/1359252077/vector/reaper-in-hood-skull-portrait-cut-out-vector-icon.jpg?s=612x612&w=0&k=20&c=y0AcMDjiS_l93zkfJWnKMnx6dhnzFrXZUPC2MOa_JPQ='
    )

    db.session.add(demo)
    db.session.add(demo2)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
