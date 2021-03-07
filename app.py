import os
from flask import Flask, send_from_directory, json, session
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv
import sqlalchemy

load_dotenv(find_dotenv())

app = Flask(__name__, static_folder='./build/static')

# Point SQLAlchemy to your Heroku database
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
# Gets rid of a warning
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

import models
db.create_all()

userList = []

cors = CORS(app, resources={r"/": {"origins": ""}})

socketio = SocketIO(
    app,
    cors_allowed_origins="*",
    json=json,
    manage_session=False
)

@app.route('/', defaults={"filename": "index.html"})
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
    print(str(userList))
    userList.append(data)
    print(str(data))
    socketio.emit('spectate', userList, broadcast=True, include_self=True)
    
# When a client disconnects from this Socket connection, this function is run
@socketio.on('disconnect')
def on_disconnect():
    print('User disconnected!')
    
@socketio.on('join')
def on_join(data):
    print(str(data))
    # check if username already in db
    
    x = db.session.query(models.Person.username).filter_by(username=data).first() is not None
    
    if x != True:
        newPerson = models.Person(username=data, score=100)
        db.session.add(newPerson)
        db.session.commit()
    #
    #people = models.Person.query.all()
    users = []
    score = []
    y = db.session.query(models.Person)
    dc_order = sqlalchemy.sql.expression.desc(models.Person.score)
    inOrder = y.order_by(dc_order)
    
    for x in inOrder:
        users.append(x.username)
        score.append(x.score)
    print(users)
    print(score)
    socketio.emit('user_list', {'users' : users})
    socketio.emit('scor_list', {'score' : score})
    
    socketio.emit('join', data, broadcast=True, include_self=True)
    
@socketio.on('result')
def on_result(data):
    player1 = db.session.query(models.Person).filter_by(username=data['winner']).first()
    player1.score= player1.score + 1
    db.session.add(player1)
    player2 = db.session.query(models.Person).filter_by(username=data['loser']).first()
    player2.score= player2.score - 1
    db.session.add(player2)
    db.session.commit()
    people = models.Person.query.all()
    print(people)
    socketio.emit('result', data, broadcast=True, include_self=False)
    

# When a client emits the event 'chat' to the server, this function is run
# 'chat' is a custom event name that we just decided

if __name__ == "__main__":
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )
