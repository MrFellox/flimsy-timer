from typing import List
from flimsy_timer.models import Solve
from flimsy_timer import db

def get_user_solves(owner_id: str) -> List[Solve]:
    '''
    Returns the owner's Solves objects

    Parmeters:
    owner_id (str): The ID of the user.

    Returns:
    List[Solve]: A list of Solve objects.
    '''

    # Filter user solves

    solves_docs = db.collection('solves').where('owner', '==', owner_id).get()

    solves = []

    for solve_doc in solves_docs:
        solves.append(Solve.from_dict(solve_doc.to_dict()))


    # Sort solves from most recent to oldest

    solves.sort(key = lambda solve: solve.date, reverse = True)

    return solves
