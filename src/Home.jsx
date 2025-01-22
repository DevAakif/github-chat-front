import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import {publicURL} from "./config.js";

function Home() {
    const [istoken, setIsToken] = useState(false);
    const navigate  = useNavigate();
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            setIsToken(true);
        }
    },[istoken]); 
    
    if(!istoken){
        navigate('/');
    }
    else{
        return (
            <>
              <div className = "home-container">
                <h2 className= "home-header">Welcome to ballerina copilot</h2>
                <Prompt/>
              </div>
            </>
          );
    }
}

function Prompt() {
  const [chatBotResponse, setChatBotResponse] = useState(null); 
  return (
    <>
      <div className='chat-container'>
        <input type="text" placeholder="Enter your prompt here" className="prompt-container"/>
        <button onClick={()=>handleCopilotSearch(setChatBotResponse)} className="prompt-button">ASK</button>
      </div>

      <div className='chat-response'>{chatBotResponse}</div>
    </>
  );
}

export default Home;

async function handleCopilotSearch(setChatBotResponse) {
  const prompt = document.querySelector('.prompt-container').value
  console.log(prompt);

  const response = await fetch(`${publicURL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    },
    body: JSON.stringify({'prompt': prompt})
  }).then((res) => res.json()).then((data) => {
    console.log(data.chatResponse);
    setChatBotResponse(data.chatResponse);
  })

}

