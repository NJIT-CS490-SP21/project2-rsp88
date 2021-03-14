import './Board.css';
import {Board} from './Board.js';
import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import io from 'socket.io-client';
import PropTypes from 'prop-types';

const socket = io();

function Inputspec() {
  const [log, login] = useState(false);
  const [name, setName] = useState([]);
  const inputRef = useRef(null);
  const [users, setUser] = useState(null);
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
    return <Board users={name} curUser={users}/>;
  }
    return <Login />;
  }
  return <Greeting isLoggedIn={log} />;
}
Inputspec.propTypes={
      isLoggedIn: PropTypes.string,
    }
export default Inputspec;