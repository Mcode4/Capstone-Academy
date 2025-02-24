from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, SelectField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.models.course import Category

IMAGE_FILES = {"png", "jpg", "jpeg", "webp", "gif"}

class CourseForm(FlaskForm):
    owner_id = IntegerField('Owner ID', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired()])
    category = SelectField('category', validators=[DataRequired()], choices=[(c.name, c.value) for c in Category])
    description = StringField(validators=[DataRequired()])
    image = FileField(validators=[FileRequired(), FileAllowed(list(IMAGE_FILES))])
