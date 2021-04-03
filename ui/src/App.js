import React, {useReducer} from 'react'
import Login from "./components/Login";
import reducer from "./reducer";

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
    console.log(state)



    return (
        <div className="container mt-5">
            {<Login onLogin={onLogin}/>}
        </div>
    );
}


export default App;
