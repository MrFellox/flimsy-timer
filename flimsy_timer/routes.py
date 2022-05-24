from flimsy_timer import app, loginmanager, db
from flimsy_timer.scrambles import gen333scramble
from flimsy_timer.models import User
from flask import render_template, flash, redirect, url_for, request, Response
from flask_login import login_required
from dateutil import parser
import datetime

@loginmanager.user_loader
def load_user(user_id):
    # Get the user from id
    return User.from_dict(db.collection('users').document(user_id).to_dict())


@app.route('/')
def index():
    return render_template('index.html', scramble = gen333scramble())

@app.route('/login')
def login():
    return render_template('login.html')

# Database

@app.route('/api/save', methods=['POST'])
def save_solve():
    try:
        data = request.get_json()
        
        doc_ref = db.collection('solves').document()

        # Parse JS ISO string to datetime.datetime

        date = parser.parse(data['date'])
        
        doc_ref.set({
            'solve_time': data['solveTime'],
            'scramble': data['scramble'],
            'is_dnf': data['isDNF'],
            'is_plus_2': data['isPlus2'],
            'date': date,
            'puzzle': data['puzzle']
        })
        
        return Response("", 200, mimetype='application/json')

    except Exception as e:
        print(e)
        return Response(response = "", status = 500, mimetype='application/json') 
    
    # db.collection('solves').document().set({
    #     'user_id': user_id,
    #     'duration': duration,
    #     'scramble': scramble,
    #     'puzzle': puzzle
    # })

    # print('saved')
    # return 200

@app.route('/api/gen333scramble')
def generate333():
    return gen333scramble()