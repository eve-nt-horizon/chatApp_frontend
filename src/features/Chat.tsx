import React, { useEffect, useState } from 'react'
import MessageBar from './chat/components/MessageBar'
import TextInputBar from './chat/components/TextInputBar'
import { proccessMessages } from '../api/socketio-client'

const Chat = () => {


    const [allMessages,setAllMessages]=useState<string[]>([]);
    useEffect(()=>{
        proccessMessages((err,data)=>{
            const newMessages=[...allMessages,data];
            setAllMessages(newMessages);
        });
    },[allMessages]);
  return (
    <div>
        <MessageBar allMessages={allMessages}/>
        <TextInputBar/>
    </div>
  )
}

export default Chat