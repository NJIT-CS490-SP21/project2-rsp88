import './Board.css';
import {Board} from './Board.js';
import React, { useState, useRef, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import io from 'socket.io-client';

const socket = io();

function Inputspec() {
  const [log, login] = useState(false);
  const [name, setName] = useState([]);
  const inputRef = useRef(null);
  const [users, setUser] = useState(null);
  const [database, setData] = useState([]);
  function Login() {
  
  function handleSubmit() 
    {
      const temp = inputRef.current.value;
      if (temp != "")
      {
        //let tempList = [...name, temp];
        //console.log(tempList);
        setUser(temp);
        login(true);
        //setName(prevList => [...prevList, temp]);
        socket.emit('spectate', temp);
        socket.emit('user_list', temp);
        socket.emit('join', temp);
        console.log(temp);
      }  
    }
    
    useEffect(() => {socket.on('spectate',(info) => {
        setName((prevList) => {
          let newList = [...prevList];
          newList = info;
          return newList;
        });
      });
        
        socket.on('user_list', (info) => {
        console.log('Chat recieved');
        console.log(info);
        setData(info);
      });
      
      },[]);
      
      
    return (
      <div className="Login">
        <div><b>Type in your Username</b></div>
        <br></br>
        <p>Username</p>
        <input ref = {inputRef} type = "text"  style={{height: "40px"}}/> 
        <br></br>
        <br></br>
        <div>
        <Button block size="lg" type="submit" onClick = {handleSubmit}>
          Login
        </Button>
        </div>
      </div>
    );
  }

  function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  
  if (isLoggedIn) {
    return <Board users={name} curUser={users} dataName={database}/>;
  }
    return <Login />;
  }
  return <Greeting isLoggedIn={log} />;
}
export default Inputspec;