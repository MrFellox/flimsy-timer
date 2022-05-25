from flimsy_timer import app, loginmanager, db
from flimsy_timer.scrambles import gen333scramble
from flimsy_timer.models import User, Solve
from flimsy_timer.forms import LoginForm, RegisterForm
from flask import render_template, flash, redirect, url_for, request, Response
from flask_login import current_user, login_required, login_user, logout_user
from dateutil import parser
import datetime
import flask_bcrypt

@loginmanager.user_loader
def load_user(user_id):
    # Get the user from id
    user = db.collection('users').where('id', '==', user_id).get()

    if not user:
        return None

    return User.from_dict(user[0].to_dict())


def unathorized_callback():
    return redirect(url_for('login'))

loginmanager.unauthorized_handler(unathorized_callback)


@app.route('/login', methods = ['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))

    form = LoginForm()
    if form.validate_on_submit():
        # Check if user exists

        user_doc = db.collection('users').where('username', '==', form.username.data.lower()).get()
        if not user_doc:
            flash('User does not exist', 'danger')
            return redirect(url_for('login'))

        user_db = User.from_dict(user_doc[0].to_dict())

        if (flask_bcrypt.check_password_hash(user_db.password, form.password.data)):
            login_user(user_db)

            return redirect(url_for('index'))

    return render_template('login.html', form = form)

@app.route('/register', methods = ['GET', 'POST'])
def register():
    form = RegisterForm()
    if current_user.is_authenticated:
        return redirect(url_for('index'))

    if form.validate_on_submit():
        print('Register form validated')
        # Check if username is registered

        user_doc = db.collection('users').where('username', '==', form.username.data).get()
        
        if user_doc:
            flash('Username is already registered', 'danger')
            
        else:
            # hash password

            hashed = flask_bcrypt.generate_password_hash(form.password.data)

            # Lower username for consistency
            username = form.username.data.lower()

            new_doc = db.collection('users').document().get()
            
            # Create user
            user = User(id = new_doc.id, username = username, email = form.email.data, password = hashed)

            db.collection('users').document(user.id).set(user.to_dict())
            
            login_user(user)
            flash('Succesfully registered!\nWelcome to Flimsy Time!', 'info')
            return redirect(url_for('index'))

    return render_template('register.html', form = form)

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))


#* Page routes

@app.route('/')
@login_required
def index():
    return render_template('index.html', scramble = gen333scramble())


@app.route('/solves')
@login_required
def solves():
    # Filter user solves

    solves_docs = db.collection('solves').where('owner', '==', current_user.id).get()

    solves = []

    for solve_doc in solves_docs:
        solves.append(Solve.from_dict(solve_doc.to_dict()))

    return render_template('solves.html', solves = solves)


#* Database

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
            'puzzle': data['puzzle'],
            'owner': data['owner'],
            'id': doc_ref.get().id
        })
        
        return Response("", 200, mimetype='application/json')

    except Exception as e:
        print(e)
        return Response(response = "", status = 500, mimetype='application/json') 

@app.route('/shared/solve/<solve_id>')
def shared_solve(solve_id):
    solve_doc = db.collection('solves').document(solve_id).get()

    if not solve_doc:
        return Response(response = "", status = 404, mimetype='application/json')

    solve = Solve.from_dict(solve_doc.to_dict())

    owner = User.from_dict(db.collection('users').document(solve.owner).get().to_dict())
    data = {'solve': solve, 'owner': owner}

    return render_template('sharedSolve.html', solve = solve, owner = owner)
    
@app.route('/api/gen333scramble')
def generate333():
    return gen333scramble()