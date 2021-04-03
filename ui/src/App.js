import React, {useReducer} from 'react'
import Login from "./components/Login";
import reducer from "./reducer";
import socket from './socket'

function App() {
    const [state, dispatch] = useReducer(reducer, {
        joined: false
    })
    const onLogin = () => {
        dispatch({
            type: 'JOINED',
            payload: true
        })
    }


    return (
        <div className="container mt-5">
            { !state.joined && <Login onLogin={onLogin}/>}
        </div>
    );
}


export default App;
