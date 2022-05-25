from flask_login import UserMixin

class User(UserMixin):
    def __init__(self, id, email, username, password):
        self.id = id
        self.email = email
        self.username = username
        self.password = password


    @staticmethod
    def from_dict(d):
        return User(d['id'], d['email'], d['username'], d['password'])

    def to_dict(self):
        return {'id': self.id, 'email': self.email, 'username': self.username, 'password': self.password}

    def __repr__(self):
        return f'<Users {self.id} {self.email} {self.username} {self.password}>'