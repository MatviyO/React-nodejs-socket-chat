import React, {useReducer} from 'react'
import Login from "./components/Login";

function App() {
    const [state, dispatch] = useReducer(reducer, {
        isAuth: false
    })
    const onLogin = () => {
        dispatch({
            type: 'IS_AUTH',
            payload: true
        })
    }
    return (
        <div className="container mt-5">
            <Login />
        </div>
    );
}


export default App;
