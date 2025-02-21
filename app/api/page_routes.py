from flask import Blueprint, request
# from app.models import Page, db

# page_routes = Blueprint('page_routes', __name__)

# @page_routes.route('/course/<int:id>', methods=['GET'])
# def get_pages_for_course(id):
#     pages = Page.query.filter(Page.course_id == id).order_by(Page.createdAt).all()
#     return {"pages": {pages.index(page) : page.to_dict() for page in pages}}

# @page_routes.route('/<int:id>', methods=['POST'])
# def create_page(id):
#     new = Page(
#         course_id= id
#     )
#     db.session.add(new)
#     db.session.commit()
#     return new.to_dict(), 201

# @page_routes.route('/<int:id>', methods=['GET'])
# def get_page(id):
#     page = Page.query.get(id)
#     return page.to_dict(), 200

# @page_routes.route('/<int:id>', methods=['DELETE'])
# def delete_page(id):
#     page = Page.query.get(id)
#     db.session.delete(page)
#     db.session.commit()
#     return {"message": "Page successfully deleted"}