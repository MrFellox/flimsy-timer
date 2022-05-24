from flask_login import UserMixin

class User(UserMixin):
    def __init__(self, id, username, password):
        self.id = id
        self.username = username
        self.password = password


    @staticmethod
    def from_dict(d):
        return Users(d['id'], d['username'], d['password'])

    def to_dict(self):
        return {'id': self.id, 'username': self.username, 'password': self.password}

    def __repr__(self):
        return f'<Users {self.id} {self.username} {self.password}>'