import logo from './logo.svg';
import React from 'react';
import './Board.css';
import './App.js';
import { useState, useRef, useEffect } from 'react';
import Button from "react-bootstrap/Button";
import io from 'socket.io-client';

const socket = io();
export function Board(props) {
  const [board, setBoard] = useState(['','','','','','','','','']);
  const [variable, setVariable] = useState(0);
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

      
  return (
    <div>
    <li>{props.curUser}'s Tic Tac Toe Board</li>
    <br></br>
    <div class="board">
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
      {props.users.map((listItem) => (
        <li>{listItem}</li>
      ))}
    </div>
    <b> Game winner is </b>
    <br></br>
    <div>
    {win !== null ? [win === 'X' ? <div > {win + ' ' + props.users[1]} </div> : <div > {win + ' ' + props.users[0]} </div> ]:<div></div>}
    </div>
    </div>
    
    );
  
}
export default Board;