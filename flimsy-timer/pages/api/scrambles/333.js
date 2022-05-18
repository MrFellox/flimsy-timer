function gen333Scramble() {
    let scramble = "";
    let j, c, b, m, r;
    for (c = b = j = 25, r = Math.random; j; c + b - 5 | c - m && b - m ? scramble += ("URFBLD"[j--, c = b, b = m] + " 2'"[0 | r() * 3] + " ") : 0)m = 0 | r() * 6

    return scramble;
}

export default function handler(req, res) {
    if (req.method == 'GET') {
        res.status(200).send({ scramble: gen333Scramble() })
    }
}