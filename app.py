import os
from flask import Flask, send_from_directory, json, session
from flask_socketio import SocketIO
from flask_cors import CORS

app = Flask(__name__, static_folder='./build/static')

cors = CORS(app, resources={r"/": {"origins": ""}})

userList = []

socketio = SocketIO(
    app,
    cors_allowed_origins="*",
    json=json,
    manage_session=False
)

@app.route('/', defaults={"filename": "Board.html"})
@app.route('/<path:filename>')

def index(filename):
    return send_from_directory('./build', filename)

# When a client connects from this Socket connection, this function is run
@socketio.on('connect')
def on_connect():
    print('User connected!')

@socketio.on('build')
def build(data):
    print(str(data))
    socketio.emit('build', data, broadcast=True, include_self=False)
    
@socketio.on('reset')
def reset(data):
    print(str(data))
    print("reset");
    socketio.emit('reset', data, broadcast=True, include_self=True)
    
@socketio.on('spectate')
def spectate(data):
    userList.append(data)
    print(str(data))
    socketio.emit('spectate', userList, broadcast=True, include_self=True)
    
# When a client disconnects from this Socket connection, this function is run
@socketio.on('disconnect')
def on_disconnect():
    print('User disconnected!')

# When a client emits the event 'chat' to the server, this function is run
# 'chat' is a custom event name that we just decided

socketio.run(
    app,
    host=os.getenv('IP', '0.0.0.0'),
    port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
)
