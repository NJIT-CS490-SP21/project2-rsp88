"""APP SOCKETS"""
import os
from flask import Flask, send_from_directory, json
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv
import sqlalchemy
import models

load_dotenv(find_dotenv())

APP = Flask(__name__, static_folder='./build/static')

# Point SQLAlchemy to your Heroku database
APP.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
# Gets rid of a warning
APP.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

DB = SQLAlchemy(APP)

DB.create_all()

USERLIST = []

CORS = CORS(APP, resources={r"/": {"origins": ""}})

SOCKETIO = SocketIO(
    APP,
    cors_allowed_origins="*",
    json=json,
    manage_session=False
)

@APP.route('/', defaults={"filename": "index.html"})
@APP.route('/<path:filename>')

def index(filename):
    """Index Function"""
    return send_from_directory('./build', filename)

# When a client connects from this Socket connection, this function is run
@SOCKETIO.on('connect')
def on_connect():
    """When User Connects"""
    print('User connected!')

@SOCKETIO.on('build')
def build(data):
    """It Builds data"""
    print(str(data))
    SOCKETIO.emit('build', data, broadcast=True, include_self=False)

@SOCKETIO.on('reset')
def reset(data):
    """For Resetting the Board"""
    print(str(data))
    print("reset")
    SOCKETIO.emit('reset', data, broadcast=True, include_self=True)

@SOCKETIO.on('spectate')
def spectate(data):
    """For the Spectators"""
    print(str(USERLIST))
    USERLIST.append(data)
    print(str(data))
    SOCKETIO.emit('spectate', USERLIST, broadcast=True, include_self=True)

# When a client disconnects from this Socket connection, this function is run
@SOCKETIO.on('disconnect')
def on_disconnect():
    """When user Disconnects"""
    print('User disconnected!')

@SOCKETIO.on('join')
def on_join(data):
    """When User Joins"""
    print(str(data))
    # check if username already in DB

    x = DB.session.query(models.Person.username).filter_by(username=data).first() is not None

    if x is not True:
        newPerson = models.Person(username=data, score=100)
        DB.session.add(newPerson)
        DB.session.commit()
    #
    #people = models.Person.query.all()
    users = []
    score = []
    y = DB.session.query(models.Person)
    dc_order = sqlalchemy.sql.expression.desc(models.Person.score)
    inOrder = y.order_by(dc_order)

    for x in inOrder:
        users.append(x.username)
        score.append(x.score)
    print(users)
    print(score)
    SOCKETIO.emit('user_list', {'users' : users})
    SOCKETIO.emit('scor_list', {'score' : score})

    SOCKETIO.emit('join', data, broadcast=True, include_self=True)

@SOCKETIO.on('result')
def on_result(data):
    """To add User to the Database"""
    player1 = DB.session.query(models.Person).filter_by(username=data['winner']).first()
    player1.score = player1.score + 1
    DB.session.add(player1)
    player2 = DB.session.query(models.Person).filter_by(username=data['loser']).first()
    player2.score = player2.score - 1
    DB.session.add(player2)
    DB.session.commit()
    people = models.Person.query.all()
    print(people)
    SOCKETIO.emit('result', data, broadcast=True, include_self=False)

# When a client emits the event 'chat' to the server, this function is run
# 'chat' is a custom event name that we just decided

if __name__ == "__main__":
    SOCKETIO.run(
        APP,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )
