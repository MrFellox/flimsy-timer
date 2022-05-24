#* Code from https://replit.com/talk/share/Rubiks-cube-scramble-generator/116900
import random

scrambles3x3 = ["R","R'","R2","L","L'","L2","U","U'","U2","D","D'","D2","F","F'","F2","B","B'","B2"]
scrambles2x2 = ["R","R'","R2","L","L'","L2","U","U'","U2","D","D'","D2","F","F'","F2","B","B'","B2"]
scramblespyraminx = ["R","R'","R2","L","L'","L2","U","U'","U2","B","B'","B2","l","l'","r","r'","u","u'","b","b'"]

def gen333scramble():
    next_move = None
    new = scrambles3x3.copy()
    add = 20

    num = add
    scramble = ''

    for i in range(num):
        current_move = random.choice(new)

        if current_move == next_move:
            num += 1
            continue

        next_move = current_move
        scramble += current_move + ' '

    this = 'empty'
    return scramble
