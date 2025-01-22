import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Loading from './Loading';
import { publicURL } from './config';

function Login() {
  const urlParams = new URLSearchParams(window.location.search);
	const code = urlParams.get("code");
  const navigate  = useNavigate();

  const [istoken, setIsToken] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
      const token = localStorage.getItem('token');

      if(token){
          setIsToken(true);
      }else if(code){
        setIsLoading(true);
        fetch(`${publicURL}/auth2?code=${code}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data.token)
          localStorage.setItem('token', data.token);
          setIsToken(true);
          setIsLoading(false);
        })
      }
  },[code]);
  
  if(istoken){
      navigate('/home');
  } else if(isLoading){
    return (
      <Loading/>
    );

  } else{
    return (
      <>
        <div className = "login-container">
          <h2 className= "login-header">Connect with ballerina copilot</h2>
          <Button/>
        </div>
      </>
    );
  }
  
}

function Button() {
  function handleRedirect() {
    const client_id = ${client_id};
    const redirectUri = "http://localhost:3000/login";
    const authorizationUri = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirectUri}`;
    window.location.href = authorizationUri;
  }
  return (
    <button className="btn-login" onClick={handleRedirect}>Login</button>
  );
}

export default Login;