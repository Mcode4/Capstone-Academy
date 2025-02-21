from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, SelectField
from wtforms.validators import DataRequired
from app.models.course import Category

class CourseForm(FlaskForm):
    owner_id = IntegerField(validators=[DataRequired()])
    name = StringField(validators=[DataRequired()])
    category = SelectField(validators=[DataRequired()],
        choices=[(c.name, c.value) for c in Category]
    ),
    description = StringField(validators=[DataRequired()])
    image = StringField(validators=[DataRequired()])
