from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired

class CommentForm(FlaskForm):
    owner_id = IntegerField(validators=[DataRequired()])
    course_id = IntegerField(validators=[DataRequired()])
    rating = IntegerField(validators=[DataRequired()])
    comment = StringField(validators=[DataRequired()])