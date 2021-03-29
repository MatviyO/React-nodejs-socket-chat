import React from "react";
import axios from "axios";

function Login({onLogin}) {
    const [roomId, setRoomId] = useState('')
    const [userName, setUserName] = useState('')

    const onEnter = () => {
        if (!roomId || !userName) {
            return alert('Fields null')
        }
        axios.post('/rooms', {
            roomId,
            userName
        }).then(() => {
            onLogin();
        })

    }

    return(
        <div className="row align-items-center justify-content-center flex-column mt-5">
            <div className="form-group">
                <input type="text" className="form-control" onChange={e => setRoomId(e.target.value)} placeholder="Room ID" value={roomId}/>
            </div>
            <div className="form-group">
                <input type="text" className="form-control" onChange={e => setUserName(e.target.value)} placeholder="Your Name" value={userName}/>
            </div>
            <div className="form-group">
                <button onClick={onEnter} className="btn btn-outline-primary" >Connect</button>
            </div>
        </div>
    )
}

export  default  Login
