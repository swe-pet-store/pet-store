import React, { useState } from "react";
import { RxTextAlignCenter } from "react-icons/rx";
import { Link } from 'react-router-dom'

export const LoginPage = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  const containerStyle = {
    backgroundColor: "#ffffff", 
    width: "400px", 
    height: "400px", 
    margin: "auto", 
    marginTop: "100px",
    padding: "20px", 
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", 
    borderRadius: "15px",
  };

  const inputStyle = {
    marginBottom: "25px",
    border: "1.5px solid #cccccc",
    borderRadius: "15px",
    backgroundColor: "white",
    fontSize: "16px",
    padding: "8px",
    width: "100%",
    boxSizing: "border-box"
  };

  const buttonStyle = {
    alignSelf: "center",
    backgroundColor: "#FFE5A4",
    borderRadius: "22px",
    padding: "10px 30px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    display: "block",
    margin: "0 auto",
    marginBottom: "20px"
  };

  const h1Style = {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "1.5em",
    display: "block",
    margin: "0 auto"
  }

  const h2Style = {
    fontSize: "0,5em",
    fontWeight: "lighter",
    textAlign: "center",
    marginBottom: "20px",
    marginTop: "10px"
  }
  const h3Style = {
    fontSize: "14px",
    fontWeight: "lighter",
    marginTop: "10px",
    display: "block",  
    margin: "0 auto"
  }

  const displayInLine = {
    display: "flex",
    marginRight: "10px",
  }

  const linkStyle = {
    fontWeight: "bold",
    fontSize: "14px"

  }

  const imageStyle = {
    position: "fixed",
    bottom: 0,
    left: 0,
    zIndex: 1   
  }

  return (
    <html>
      <body>

        <img src="../images/doggy.png" alt="Dog icon" style = {imageStyle}></img>

        <div style={containerStyle}>
          <h1 style = {h1Style}>User Login</h1>
          <h2 style = {h2Style}>Enter your credentials to sign in into your account</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                value={email}
                placeholder="Email"
                onChange={handleEmailChange}
                style={inputStyle}
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                style={inputStyle}
                required
              />
            </div>
            <button type="submit" style={buttonStyle}>Sign in</button>

            <div style = {displayInLine}>
              <h3 style={h3Style}>Don't have an accout?</h3><Link to={'/'} style={linkStyle}>Create one now</Link>
            </div>

          </form>
        </div>
      </body>
    </html>
    
  );
}
