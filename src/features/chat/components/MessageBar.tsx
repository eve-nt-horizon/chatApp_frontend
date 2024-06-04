import React from 'react'
import Message from './Message'

const MessageBar = ({allMessages}:{allMessages:string[]}) => {
  return (
    <div>
        {allMessages.map((message,index) => {
            return <Message key={index} text={message}/>
        })}
    </div>
  )
}

export default MessageBar