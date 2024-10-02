/* jshint esversion: 11 */

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Stack, TextField } from "@mui/material";

import {
    appNameStyle,
    loginFormTitleStyle,
    textFieldStyle,
    submitButtonStyle,
    loginFormStyle
} from "../styles/LoginFormStyles";


function LoginForm() {

    const [customerID, setCustomerID] = useState("");
    const [password, setPassword] = useState("");
    const userIDRef = useRef(null);
    const navigateToPath = useNavigate();

    const handleSubmit = async (event, customerID, password) => {
        event.preventDefault();
        let url = new URL("http://localhost:3001/api/milk/login/");
        const options = {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }, 
            body: JSON.stringify({submittedUserID: customerID, submittedPassword: password})
        };
        fetch(url, options)
            .then(response => {
                if (response.status === 201) {
                    sessionStorage.setItem("userID", customerID);
                    navigateToPath("../home", { replace: true });
                    return;
                }
                alert("INVALID USERNAME OR PASSWORD");
                return;
            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
        userIDRef.current.focus();
    }, []);

    return (
        <>
            <h1
                id="appName"
                style={appNameStyle}
            >
                DOODH WAALA
            </h1>
            <h3
                id="loginFormTitle"
                style={loginFormTitleStyle}
            >
                Sign In to App
            </h3>
            <Stack
                id="loginForm"
                component="form"
                sx={loginFormStyle}
                onSubmit={event => handleSubmit(event, customerID, password)}
            >
                <TextField
                    fullWidth
                    id="loginUserId"
                    className="text-field"
                    variant="outlined"
                    label="User ID"
                    size="large"
                    inputRef={userIDRef}
                    sx={textFieldStyle}
                    onBlur={event => setCustomerID(event.target.value)}
                >
                </TextField>
                <TextField
                    fullWidth
                    id="loginPassword"
                    className="text-field"
                    variant="outlined"
                    label="Password"
                    type="password"
                    size="large"
                    sx={textFieldStyle}
                    onBlur={event => setPassword(event.target.value)}
                >
                </TextField>
                <Button 
                    id="signInButton"
                    variant="contained"
                    type="submit"
                    size="large"
                    color="primary"
                    sx={{ 
                        width: "400px",
                        fontWeight: "bold",
                        fontSize: "18px"
                    }}
                    
                >
                    Sign In
                </Button>
                <hr style={{ width: "400px", height: "0px", color: "gray", backgroundColor: "gray" }} />
                <Button
                    id="signUpButton"
                    variant="contained" 
                    size="large" 
                    sx={submitButtonStyle} 
                    onClick={() => navigateToPath("/signup")}
                >
                    Sign Up
                </Button>
            </Stack>
        </>
    );
}

export default LoginForm;
