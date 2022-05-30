from typing import Text
from flask import Flask
from flask_wtf import FlaskForm
from wtforms import EmailField, PasswordField, SubmitField, StringField, FloatField, TextAreaField, RadioField
from wtforms.validators import DataRequired, Email, EqualTo, Length

class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Log In')

class RegisterForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired(), Length(min=6, max=40)])
    email = EmailField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired(), Length(min=6)])
    confirm_password = PasswordField('Confirm Password', validators=[DataRequired(), EqualTo('password')])
   
    submit = SubmitField('Register')

class EditSolve(FlaskForm):
    solve_time = FloatField('Solve Time', validators=[DataRequired()])

    penalties = RadioField('Penalties', choices=[(None, 'No Penalties'), ('DNF', 'DNF'), ('plus2', '+2')], validators=[DataRequired()])

    scramble = TextAreaField('Scramble', validators=[DataRequired(), Length(min=3, max=100)])
    comment = TextAreaField('Comment')