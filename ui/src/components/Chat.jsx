import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import socket from '../socket';

function Chat({users, messages, userName, roomId, onAddMessage}) {
    const [messageValue, setMessagevalue] = useState('')
    const ref = useRef(null);

    const onSendMessage = () => {
        socket.emit('ROOM:NEW_MESSAGE', {
            userName,
            roomId,
            text: messageValue
        })
        onAddMessage({userName, text: messageValue})
        setMessagevalue('')
    }

    useEffect(() => {
        ref.current.scrollTo(0, 9999)
    }, [messages]);
    
    return (
        <div className="row align-items-center justify-content-center flex-column mt-5">
            <div className="messaging">
                <div className="inbox_msg">
                    <div className="inbox_people">
                        <div className="headind_srch">
                            <div className="recent_heading">
                                <h4> Users: {users.length} < /h4> <span className="ml-auto">RoomId: {roomId}</span>   </div>
                        </div>
                        <div className="inbox_chat"> {
                            users.map((name, index) => (<
                                    div className="chat_list active_chat"
                                        key={name + index}>
                                    <div className="chat_people">
                                        <div className="chat_img">< img
                                            src="https://ptetutorials.com/images/user-profile.png"
                                            alt="sunil"/>< /div>
                                        <div className="chat_ib">
                                            <h5> {name} < span
                                                className="chat_date"> {new Date().toDateString()} < /span></h5>
                                            <p> {index + 1} < /p></div>
                                    </div>
                                </div>
                            ))
                        }

                        </div>
                    </div>
                    <div className="mesgs overflow-auto">
                        <div className="msg_history" ref={ref}>
                            <div className="incoming_msg">
                                <div className="incoming_msg_img"><img
                                    src="https://ptetutorials.com/images/user-profile.png"
                                    alt="sunil"/></div>
                                <div className="received_msg">
                                    <div className="received_withd_msg">
                                        <p> Test which is a new approach to have all solutions < /p>
                                        <span className="time_date"> {new Date().toDateString()} < /span></div>
                                </div>
                            </div>
                            {
                                messages.map(message => (<
                                        div className="outgoing_msg">
                                        <div className="sent_msg">
                                            <p> {message.text} </p>
                                            <span className="time_date"> {message.userName} - {new Date().toDateString()} < /span></div>
                                    </div>
                                ))
                            } </div>
                        <div className="type_msg">
                            <div className="input_msg_write">
                                <input type="text"
                                       className="write_msg"
                                       value={messageValue}
                                       onChange={
                                           (e) => setMessagevalue(e.target.value)}
                                       placeholder="Type a message"/>
                                <button className="msg_send_btn"
                                        onClick={onSendMessage}
                                        type="button">< i className="fa fa-paper-plane-o" aria-hidden="true"> < /i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat
