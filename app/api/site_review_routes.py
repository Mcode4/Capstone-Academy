from flask import Blueprint, request
from app.models import SiteReview, db
from app.forms import SiteReviewForm
from sqlalchemy import desc

site_review_routes = Blueprint('site_review_routes', __name__)

@site_review_routes.route('')
def get_all_reviews():
    site_reviews = SiteReview.query.all()
    return {"siteReviews": [review.to_dict() for review in site_reviews]}, 200

@site_review_routes.route('/highest')
def get_highest_reviews():
    site_reviews = SiteReview.query.order_by(desc(SiteReview.rating)).limit(4).all()
    return {"siteReviews": [review.to_dict() for review in site_reviews]}, 200

@site_review_routes.route('', methods=["POST"])
def add_review():
    form = SiteReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(f'\n FORM DATAA: {form.data} \n')
    if form.validate_on_submit():
        new = SiteReview(
            first_name = form.data["first_name"],
            last_name = form.data["last_name"],
            rating = form.data["rating"],
            review = form.data["review"],
        )
        db.session.add(new)
        db.session.commit()
        return {"siteReview": new.to_dict()}, 201
    return form.errors, 400