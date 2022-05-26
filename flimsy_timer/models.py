from flask_login import UserMixin
import arrow

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


class Solve:
    def __init__(self, solve_time, scramble, puzzle, is_plus_2, is_dnf, date, owner, id):
        self.solve_time = solve_time
        self.scramble = scramble
        self.puzzle = puzzle
        self.is_plus_2 = is_plus_2
        self.is_dnf = is_dnf
        self.date = arrow.get(date)
        self.owner = owner
        self.id = id

    @staticmethod
    def from_dict(source):
        return Solve(source['solve_time'], source['scramble'], source['puzzle'], source['is_plus_2'], source['is_dnf'], source['date'], source['owner'], source['id'])

    def to_dict(self):
        return {'solve_time': self.solve_time, 'scramble': self.scramble, 'puzzle': self.puzzle, 'is_plus_2': self.is_plus_2, 'is_dnf': self.is_dnf, 'date': self.date, 'owner': self.owner, "id": self.id}

    def __repr__(self):
        return f'<Solve {self.solve_time} {self.scramble} {self.puzzle} {self.is_plus_2} {self.is_dnf} {self.date} {self.owner} {self.id}>'
