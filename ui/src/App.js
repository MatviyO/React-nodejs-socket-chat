import React, {useReducer} from 'react'
import Login from "./components/Login";
import reducer from "./reducer";
import socket from './socket'

function App() {
    const [state, dispatch] = useReducer(reducer, {
        joined: false,
        roomId: null,
        userName: null
    })
    const onLogin = (obj) => {
        dispatch({
            type: 'JOINED',
            payload: obj
        })
        socket.emit('ROOM:JOIN', obj);
    }


    return (
        <div className="container mt-5">
            { !state.joined && <Login onLogin={onLogin}/>}
        </div>
    );
}


export default App;
