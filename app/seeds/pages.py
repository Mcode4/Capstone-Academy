# from app.models import db, Page, environment, SCHEMA
from sqlalchemy.sql import text

# def seed_pages():
#     demo = Page(
#         course_id = 1
#     )
#     demo2 = Page(
#         course_id = 1
#     )
#     db.session.add(demo)
#     db.session.add(demo2)
#     db.session.commit()

# def undo_pages():
#     if environment == 'production':
#         db.session.execute(f"TRUNCATE table {SCHEMA}.pages RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM pages"))
#     db.session.commit()