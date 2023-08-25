import React,{useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';  
import {useLocation} from 'react-router-dom';

let socket;

const Chat = () => {
    const [name,setName] = useState('');
    const [room,setRoom] = useState('');
    const ENDPOINT = 'localhost:5000';
    const location = useLocation();

    socket = io(ENDPOINT);
  
    useEffect(() => {
        const {name,room} = queryString.parse(location.search);

        setName(name);
        setRoom(room);
        console.log(socket);
    });

    return (
        <h1>Chat</h1>
    );
}

export default Chat;