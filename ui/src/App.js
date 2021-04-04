import React, {useEffect, useReducer} from 'react'
import Login from "./components/Login";
import reducer from "./reducer";
import socket from './socket'
import Chat from "./components/Chat";

function App() {
    const [state, dispatch] = useReducer(reducer, {
        joined: false,
        roomId: null,
        userName: null,
        users: [],
        messages: []
    })
    const onLogin = (obj) => {
        dispatch({
            type: 'JOINED',
            payload: obj
        })
        socket.emit('ROOM:JOIN', obj);
    };
    console.log(state)
    useEffect(() => {
        socket.on('ROOM:JOINED', (users) => {
            console.log(users)
            dispatch({
                type: 'SET_USERS',
                payload: users

            })
        })
    }, [])

    return (
        <div className="container mt-5">
            { !state.joined
                ? <Login onLogin={onLogin}/>
                    : <Chat {...state} />}
        </div>
    );
}


export default App;
