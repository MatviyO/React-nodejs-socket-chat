import React from 'react'
import socket from 'socket.io-client'

function App() {
    const connect = () => {
        const io = socket('http://localhost:9999');
    }
    return (
        <div className="container mt-5">
            <div className="row align-items-center justify-content-center flex-column mt-5">
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Room ID" value=""/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Your Name" value=""/>
                </div>
                <div className="form-group">
                    <button className="btn btn-outline-primary" onClick={connect}>Connect</button>
                </div>
            </div>
        </div>
    );
}

export default App;
