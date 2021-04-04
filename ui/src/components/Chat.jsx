import React, {useState} from "react";
import axios from "axios";

function Chat({users, messages}) {
    const [messageValue, setMessagevalue] = useState('')


    return(
        <div className="row align-items-center justify-content-center flex-column mt-5">
            <div className="messaging">
                <div className="inbox_msg">
                    <div className="inbox_people">
                        <div className="headind_srch">
                            <div className="recent_heading">
                                <h4>Recent</h4>
                            </div>
                        </div>
                        <div className="inbox_chat">
                            {
                                users.map((name, index) => (
                                    <div className="chat_list active_chat" key={name + index}>
                                        <div className="chat_people">
                                            <div className="chat_img"><img
                                                src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /></div>
                                            <div className="chat_ib">
                                                <h5>{name} <span className="chat_date">{Date.now()}</span></h5>
                                                <p>{users.length}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                    <div className="mesgs">
                        <div className="msg_history">
                            <div className="incoming_msg">
                                <div className="incoming_msg_img"><img
                                    src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/></div>
                                <div className="received_msg">
                                    <div className="received_withd_msg">
                                        <p>Test which is a new approach to have all
                                            solutions</p>
                                        <span className="time_date"> 11:01 AM    |    June 9</span></div>
                                </div>
                            </div>
                            <div className="outgoing_msg">
                                <div className="sent_msg">
                                    <p>Test which is a new approach to have all
                                        solutions</p>
                                    <span className="time_date"> 11:01 AM    |    June 9</span></div>
                            </div>
                        </div>
                        <div className="type_msg">
                            <div className="input_msg_write">
                                <input type="text" className="write_msg"
                                       onChange={(e) => setMessagevalue(e.target.value)} placeholder="Type a message"/>
                                <button className="msg_send_btn" type="button"><i className="fa fa-paper-plane-o"
                                                                                  aria-hidden="true"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export  default  Chat
