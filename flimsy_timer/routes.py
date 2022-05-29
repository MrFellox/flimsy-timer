from flimsy_timer import app, loginmanager, db
from flimsy_timer.scrambles import gen333scramble
from flimsy_timer.models import User, Solve
from flimsy_timer.forms import LoginForm, RegisterForm
from flask import render_template, flash, redirect, url_for, request, Response
from flask_login import current_user, login_required, login_user, logout_user
from dateutil import parser
import arrow
import datetime
import flask_bcrypt

from flimsy_timer.utils import get_user_solves

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

        else:
            flash('Incorrect password', 'danger')
            return redirect(url_for('login'))

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

        elif ' ' in form.username.data:
            flash('Username cannot contain spaces', 'danger')
            
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
            flash('Succesfully registered! | Welcome to Flimsy Timer!', 'info')
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


@app.route('/solves/<solve_id>')
@app.route('/solves', defaults = {'solve_id': None})
@login_required
def solves(solve_id: None):

    if solve_id != None:
        return render_template('solveData.html')


    solves = get_user_solves(current_user.id)

    return render_template('solves.html', solves = solves)

#* Database and solves management

@app.route('/api/save', methods=['POST'])
def save_solve():
    try:
        data = request.get_json()
        
        doc_ref = db.collection('solves').document()

        doc_ref.set({
            'solve_time': data['solveTime'],
            'scramble': data['scramble'],
            'is_dnf': data['isDNF'],
            'is_plus_2': data['isPlus2'],
            'date': arrow.utcnow().format('YYYY-MM-DD HH:mm:ss'),
            'puzzle': data['puzzle'],
            'owner': data['owner'],
            'id': doc_ref.get().id
        })
        
        return Response("", 200, mimetype='application/json')

    except Exception as e:
        print(e)
        return Response(response = "", status = 500, mimetype='application/json') 

@app.route('/edit_solve/<solve_id>')
def edit_solve(solve_id):

    try:
        # Check if user is owner of solve
        solve = Solve.from_dict(db.collection('solves').where('id', '==', solve_id).get()[0].to_dict())

        if solve.owner == current_user.id:
            return 'can edit'
        
        flash('You are not the owner of that solve!', 'danger')
        return redirect(url_for('solves')) 

    except Exception as e:
        flash('An unknown error occured', 'danger')
        return redirect(url_for('solves'))

@app.route('/delete_solve/<solve_id>')
def delete_solve(solve_id):
    try:
        # Check if user is owner of solve
        solve = Solve.from_dict(db.collection('solves').where('id', '==', solve_id).get()[0].to_dict())

        if solve.owner == current_user.id:
            return 'can delete'
        
        flash('You are not the owner of that solve!', 'danger')
        return redirect(url_for('solves')) 

    except Exception as e:
        flash('An unknown error occured', 'danger')
        return redirect(url_for('solves'))

# This route returns the solves of the user, this is made like this 
# to improve loading times of the /solves route
@app.route('/api/getSolveData/<owner_id>')
def get_solve_data(owner_id):

    solves = get_user_solves(owner_id)

    return render_template('solvesOutput.html', solves = solves)


@app.route('/shared/solve/<solve_id>')
def shared_solve(solve_id):
    solve_doc = db.collection('solves').document(solve_id).get()

    if not solve_doc:
        return Response(response = "", status = 404, mimetype='application/json')

    solve = Solve.from_dict(solve_doc.to_dict())

    owner = User.from_dict(db.collection('users').document(solve.owner).get().to_dict())
    data = {'solve': solve, 'owner': owner}

    return render_template('sharedSolve.html', solve = solve, owner = owner)

@app.route('/api/setDNF/<user_id>', methods = ['POST'])
def set_dnf(user_id):
    # Sets the last solve as DNF

    solves = get_user_solves(user_id)

    current_solve = solves[0]
    current_solve.is_dnf = True

    db.collection('solves').document(current_solve.id).set(current_solve.to_dict())

    return Response("", 200, mimetype='application/json')

@app.route('/api/setPlusTwo/<user_id>', methods = ['POST'])
def set_plus_two(user_id):
    # Sets the last solve as DNF

    solves = get_user_solves(user_id)

    current_solve = solves[0]
    current_solve.is_plus_2 = True

    db.collection('solves').document(current_solve.id).set(current_solve.to_dict())

    return Response("", 200, mimetype='application/json')
    
@app.route('/api/gen333scramble')
def generate333():
    return gen333scramble()

#* Management routes

@app.route('/null')
def nullate():
    # Delete all solves from flimsy admin

    solves = db.collection('solves').where('owner', '==', '9c2RP2A60ot0SU6e2RYM').get()

    for solve in solves:
        solve = Solve.from_dict(solve.to_dict())
        db.collection('solves').document(solve.id).delete()

    return redirect(url_for('solves'))