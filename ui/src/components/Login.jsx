import React from "react";
import  socket from '../socket'

function Login() {
    const [roomId, setRoomId] = useState('')
    const [userName, setUserName] = useState('')

    return(
        <div className="row align-items-center justify-content-center flex-column mt-5">
            <div className="form-group">
                <input type="text" className="form-control" placeholder="Room ID" value={roomId}/>
            </div>
            <div className="form-group">
                <input type="text" className="form-control" placeholder="Your Name" value={userName}/>
            </div>
            <div className="form-group">
                <button className="btn btn-outline-primary" >Connect</button>
            </div>
        </div>
    )
}

export  default  Login
