# Flimsy Timer
<img src = '.github/images/flimsy_timer_big.png' height = 50>

An browser-based open source speedcubing timer.
<br>
Live demo [here](https://flimsy.pythonanywhere.com/).

### Key Features
1. Your solves, available everywhere with your account.
2. Share your solves with a link to other cubers.
3. (Coming soon) Deep insights
4. (Coming soon) Cuber profile

# 📃 Table of Contents 
1. [Installation](#installation)
2. [Usage](#usage)
3. [Contributing](#contributing)
4. [License](#license)
5. [Credits](#credits)


## ⚙ Installation

#### Dependencies

* [Python 3.9](https://www.python.org/downloads/)
* [Node.js](https://nodejs.org/en/)
* A [Firebase](https://console.firebase.google.com) project

Once you have created a Firbase project, enable Firestore Database for the project.
Head over to the Credentials tab in the [Google's Developer Console](https://console.cloud.google.com/apis/credentials) and select the `firebaseadminsdk` service account.

Head over to the `Keys` tab and create a new json key. Put it in a save place, and get the full path of the key.

<hr>

1. After you have installed every dependency above, install tailwindcss with npm

```bash
npm install tailwindcss
```

- If you want to update any visual features of the project, make sure to tell tailwind to update the utility classes. Run this command from the root to do so:

    ```bash
    npx tailwindcss -i ./flimsy_timer/static/css/setup.css -o ./flimsy_timer/static/css/main.css --minify --watch
    ```

2. Clone the repository.
3. *(Optional)* Create a virtual environment

```bash
python3 -m venv venv
```

- If you want to use the virtual environment, run the following command:

    **Linux**
    ```bash
    source venv/bin/activate
    ```

    **Windows**
    ```bash
    venv\Scripts\activate
    ```

4. Install python dependencies
```bash
python3 -m pip install -r requirements.txt
```

5. Create .env file in the root folder and set these variables.

```
GOOGLE_SERVICE_ACCOUNT_PATH = <path>
```

Place the full path of your Firebase key in the `<path>` variable, without quotes.

6. Run the Flask dev server

```bash
python3 start.py
```

## Usage
To use the timer, you will need to create an account. Once you have signed in you can find the timer.

To start the timer, hold the Spacebar until the timer turns green, once you release the key, the timer will start.
To stop the timer, hit the Spacebar key again.

Every time the timer stops, a new scramble with be generated for you.

If you want to checkout your solves, hit `Solves` on the top right corner.

## Contributing

TODO

## License

This project is under [GNU GENERAL PUBLIC LICENSE](./LICENSE)

## Credits

#### Built with

- Python
- Flask
- Flask-Login
- Flask-WTF
- Flask-Bcrypt
- Tailwindcss
- Firebase

#### Developed with ♥ by

- [MrFellox](https://github.com/mrfellox) - Creator
