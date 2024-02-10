import React from 'react'
import './chat.css'
function Chat(){
    return(
        <div className='Chat'>
      <iframe className='Chat' title = "chat" src="https://minnit.chat/c/WBAR?embed&&nickname=" style={{border:'none',width:'100%',height:'500px'}}></iframe> <br></br><a href="https://minnit.chat/c/WBAR" ></a>

        </div>
    )
}
export default Chat