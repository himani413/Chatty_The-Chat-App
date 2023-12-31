import React,{useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';  
import {useLocation} from 'react-router-dom';
import './Chat.css';
import ImfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

let socket;

const Chat = () => {
    const [name,setName] = useState('');
    const [room,setRoom] = useState('');
    const[message,setMessage] = useState('');
    const[messages,setMessages] = useState([]); 
    const ENDPOINT = 'localhost:5000';
    const location = useLocation();

    socket = io(ENDPOINT, { transports : ['websocket','polling', 'flashsocket'] });
  
    useEffect(() => {
        const {name,room} = queryString.parse(location.search);

        setName(name);
        setRoom(room);
       
        socket.emit('join', {name,room},() => {
        });

        return() => {
            socket.emit('disconnect');
            socket.off();
        }
    },[ENDPOINT,location.search]);

    useEffect(() => {
        socket.on('message',(message) => {
            setMessages([...messages,message]);
        })
    },[messages]);

    const sendMessage = (event) => {
        event.preventDefault();

        if(message){
            socket.emit('sendMessage',message,() => setMessage(''));
        }
    }

    console.log(message,messages);

    return (
       <div className="outerContainer">
        <div className="container">
            <ImfoBar room={room}/>
            <Messages messages={messages} name={name}/>
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
        </div>
       </div>
    );
}

export default Chat;