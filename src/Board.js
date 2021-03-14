import React from 'react';
import './Board.css';
import './App.js';
import { useState, useEffect } from 'react';
import Button from "react-bootstrap/Button";
import io from 'socket.io-client';
import PropTypes from 'prop-types';

const socket = io();
export function Board(props) {
  const [board, setBoard] = useState(['','','','','','','','','']);
  const [variable, setVariable] = useState(0);
  const [database, setData] = useState([]);
  const [score, getScore] = useState([]);
  const [hide, show] = useState(false);
  //const [scoreboard, setScore] = useState([]);
  //console.log(props.users[0]);
  //console.log(props.curUser);
  //console.log(board);
  
  const win = winner(board);
  console.log(win);
    function TicTacToe(props){
      function toggleText(){
        if(board[props.name] === '' && win == null)
        {
          if(props.curUser === props.users[0] || props.curUser === props.users[1])
          {
            let array = [...board];
            
            if(variable == 0){
            array[props.name] = 'X';
            setBoard(array);
            setVariable(1);
            
            }
            else{
              array[props.name] = 'O';
              setBoard(array);
              setVariable(0);
            }
            socket.emit('build', props.name);
          }
        }  
      }
        
      return (<div className="box" onClick={toggleText}>{board[props.name]}</div>);
    }
    TicTacToe.propTypes={
      curUser: PropTypes.string,
      users: PropTypes.string,
      name: PropTypes.string,
    }
    
    useEffect(() => {
      socket.on('build', (data) => {
        
        console.log('---' + data);
        let array = [...board];
        if(variable == 0){
          setVariable(1);
        }
        else{
          setVariable(0);
        }
        if(variable == 0){
          array[data] = 'X';
          setBoard(array);
          setVariable(1);
        }
        else{
          array[data] = 'O';
          setBoard(array);
          setVariable(0);
        }
        if(isNaN(data))
        {
          setBoard(data);
          setVariable(0);
        }
      });
      }, [board]);
      
 function winner(squares) {
  const lines = [[0, 1, 2],[3, 4, 5],
  [6, 7, 8],[0, 3, 6],[1, 4, 7],
	[2, 5, 8],[0, 4, 8],[6, 4, 2],];
	for (let i = 0; i < lines.length; i++) {
		const [x, y, z] = lines[i];
		if (squares[x] && squares[x] === squares[y] && squares[x] === squares[z]) {
			return squares[x];
		}
	}
	return null;
}

useEffect(() => {
    console.log(win);
    if(win != null){
      //setWinner_checker("Winner is Player " + winner);
      if (win === 'X' && props.curUser === props.users[0]){
        socket.emit('result',{'winner':props.users[0],'loser':props.users[1]});
      }
      else if (win === 'O' && props.curUser === props.users[0]){
        socket.emit('result',{'winner':props.users[1],'loser':props.users[0]});
      }
    }
  }, [win]);
  
function handleReset()
{
  let resetBoard = ['', '', '', '', '', '', '', '', ''];
  
  socket.emit('reset', resetBoard);
  //setBoard(resetBoard);
  //setVariable(0);
}

useEffect(() => {
    socket.on('reset', (data) => {
      console.log('---' + data);
        setBoard(data);
      });
      }, [board]);


useEffect(() => {
  socket.on('user_list', (info) => {
        console.log('Chat recieved');
        console.log(info);
        setData(info.users);
      });
      },[]);

useEffect(() => {
  socket.on('scor_list', (info) => {
        console.log('Chat recieved');
        console.log(info);
        getScore(info['score']);
        console.log(score);
      });
      },[]);
      console.log(database);
      console.log(score);
      
  return (
    <div>
    <li>{props.curUser}s Tic Tac Toe Board</li>
    <br></br>
    <div className="board">
    <TicTacToe name="0" users={props.users} curUser={props.curUser}/>
    <TicTacToe name="1" users={props.users} curUser={props.curUser}/>
    <TicTacToe name="2" users={props.users} curUser={props.curUser}/>
    <TicTacToe name="3" users={props.users} curUser={props.curUser}/>
    <TicTacToe name="4" users={props.users} curUser={props.curUser}/>
    <TicTacToe name="5" users={props.users} curUser={props.curUser}/>
    <TicTacToe name="6" users={props.users} curUser={props.curUser}/>
    <TicTacToe name="7" users={props.users} curUser={props.curUser}/>
    <TicTacToe name="8" users={props.users} curUser={props.curUser}/>
    <br></br>
    </div>
    <Button block size="lg" type="submit" onClick = {handleReset}>
      Reset
    </Button>
    <div>
      <p>Users Online</p>
      {props.users.map((listItem, index) => (
        <li key = {index}>{listItem}</li>
      ))}
    </div>
    <b> Game winner is </b>
    <br></br>
    <div>
    {win !== null ? [win === 'X' ? <div> {win + ' ' + props.users[0]} </div> : <div > {win + ' ' + props.users[1]} </div> ]:<div></div>}
    </div>
    
    <button onClick={()=>show(!hide)}>Scoreboard</button>
    {
    hide ?
    <div>
    
    <ul>
    {database.map((listItem, index) =>(
      <div key = {index} >{listItem}</div>
    ))}
    </ul>
    
    <ul>
        {score.map((listItem, index) => (
      <div key = {index}>{listItem}</div>
    ))}
    </ul>
    </div>
    :null
    }
    </div>
    );
    
}
Board.propTypes={
      curUser: PropTypes.string,
      users: PropTypes.string,
      name: PropTypes.string,
    }
export default Board;