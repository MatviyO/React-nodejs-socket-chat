import React, { useEffect, useReducer } from 'react'
import Login from "./components/Login";
import reducer from "./reducer";
import socket from './socket'
import Chat from "./components/Chat";
import axios from "axios";

function App() {
    const [state, dispatch] = useReducer(reducer, {
        joined: false,
        roomId: null,
        userName: null,
        users: [],
        messages: []
    })
    const onLogin = async(obj) => {
        dispatch({
            type: 'JOINED',
            payload: obj
        })
        socket.emit('ROOM:JOIN', obj);
        const { data } = await axios.get(`/rooms/${obj.roomId}`)
        setUsers(data.users);
    };
    console.log(state)
    const setUsers = (users) => {
        dispatch({
            type: 'SET_USERS',
            payload: users
        })
    }

    useEffect(() => {
        socket.on('ROOM:SET_USERS', setUsers)
        socket.on('ROOM:NEW_MESSAGES', (message) => {
            dispatch({
                type: 'NEW_MESSAGE',
                payload: message
            });
        });
    }, [])

    return ( <
        div className = "container mt-5" > {!state.joined ?
            <Login onLogin = { onLogin }/> :
                <Chat {...state }/>} </div>
        );
    }


    export default App;
