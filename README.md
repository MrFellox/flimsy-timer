# Flimsy Timer

An open source speedcubing timer.

### Installation

TODO: Improve these docs

Run from binaries or clone the repo and follow these steps:

1. Install pythonnet

```bash
pip install ./pythonnet-2.5.2-cp39-cp39-win_amd64.whl
```

2. Install dependencies

```bash
pip intall -r requirements.txt
```

3. Run the application

```bash
cd flimsy_timer
python main.py
```

### Building

To build the source files, run `pyinstaller` with the `.spec` file:

```bash
cd flimsy_timer
pyinstaller "Flimsy Timer.spec"
```
