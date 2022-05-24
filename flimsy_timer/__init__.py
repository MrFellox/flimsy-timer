from flask import Flask
from flask_login import LoginManager
from firebase_admin import credentials, firestore
from dotenv import load_dotenv
import firebase_admin
import os

# Load environment variables
load_dotenv()

app = Flask(__name__)
loginmanager = LoginManager()
loginmanager.init_app(app)

# Setup Firebase
creds = credentials.Certificate(os.environ.get('GOOGLE_SERVICE_ACCOUNT_PATH'))
firebase_admin.initialize_app(creds)

db = firestore.client()

app.templates_auto_reload = True

from flimsy_timer.routes import *