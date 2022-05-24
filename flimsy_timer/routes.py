from flimsy_timer import app, loginmanager, db
from flimsy_timer.models import User
from flask import render_template, flash, redirect, url_for
from flask_login import login_required

#* Code from https://replit.com/talk/share/Rubiks-cube-scramble-generator/116900
import random

scrambles3x3 = ["R","R'","R2","L","L'","L2","U","U'","U2","D","D'","D2","F","F'","F2","B","B'","B2"]
scrambles2x2 = ["R","R'","R2","L","L'","L2","U","U'","U2","D","D'","D2","F","F'","F2","B","B'","B2"]
scramblespyraminx = ["R","R'","R2","L","L'","L2","U","U'","U2","B","B'","B2","l","l'","r","r'","u","u'","b","b'"]

num = 20
add = 20

@loginmanager.user_loader
def load_user(user_id):
    # Get the user from id
    return User.from_dict(db.collection('users').document(user_id).to_dict())


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/api/gen333scramble')
def gen333scramble():
    that = 'empty'
    new = scrambles3x3.copy()
    add = 20

    num = add
    scramble = ''

    for i in range(num):
        this = random.choice(new)

        if this == that:
            num += 1
            continue

        that = this
        scramble += this + ' '

    this = 'empty'
    return scramble
