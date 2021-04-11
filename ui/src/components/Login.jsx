import React, {useState} from "react";
import axios from "axios";

function Login({onLogin}) {
    const [roomId, setRoomId] = useState('')
    const [userName, setUserName] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const onEnter = async () => {
        if (!roomId || !userName) {
            return alert('Fields null')
        }
        const obj = {
            roomId,
            userName
        }
        setIsLoading(true)
        await axios.post('/rooms', obj)
        onLogin(obj);

    }

    return (
        <div className="row align-items-center justify-content-center flex-column mt-5">
            <div className="form-group">
                <input type="text" className="form-control" onChange={e => setRoomId(e.target.value)}
                       placeholder="Room ID" value={roomId}/>
            </div>
            <div className="form-group">
                <input type="text" className="form-control" onChange={e => setUserName(e.target.value)}
                       placeholder="Your Name" value={userName}/>
            </div>
            <div className="form-group">
                <button disabled={isLoading} onClick={onEnter} className="btn btn-outline-primary">
                    {isLoading ? 'Conecting...' : 'Connect'}
                </button>
            </div>
        </div>
    )
}

export default Login
