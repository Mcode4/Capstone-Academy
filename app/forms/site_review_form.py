from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class SiteReviewForm(FlaskForm):
    first_name = StringField(validators=[DataRequired()])
    last_name = StringField()
    rating = IntegerField(validators=[DataRequired()])
    review = StringField(validators=[DataRequired()])