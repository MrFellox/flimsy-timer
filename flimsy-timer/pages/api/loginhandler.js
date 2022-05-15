export default function handler(req, res) {

    if (req.method == 'POST') {
        res.status(200).send({ message: `Login received with data - username : ${req.body.username} | password : ${req.body.password}`, body: req.body });
    }

    else {
        res.status(402).send('Bad request.');
    }

    return
}