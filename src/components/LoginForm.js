/* jshint esversion: 11 */

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/LoginForm.css';

import { Button, Stack, TextField } from '@mui/material';


const styleOfTextField = {
    borderColor: 'white',
    borderRadius: '8px',
    backgroundColor: 'white',
    marginBottom: '2px',
    textAlign: 'center'
};

const styleOfButton = {
    height: "45px", 
    width: "207px",
    backgroundColor: "#42b72a",
    color: "white",
    fontWeight: 'bold',
    fontSize: '17px'
};


const handleSubmit = (event, customerID, password, navigateTo) => {
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
                sessionStorage.setItem('userID', customerID);
                navigateTo("../home", { replace: true });
                return;
            }
            alert('INVALID USERNAME OR PASSWORD');
            return;
        })
        .catch(error => {
            console.log(error);
        });
};


function LoginForm() {

    const [customerID, setCustomerID] = useState("");
    const [password, setPassword] = useState("");
    const userIDRef = useRef(null);
    const navigateToPath = useNavigate();

    useEffect(() => {
        userIDRef.current.focus();
    }, []);

    return (
        <>
            <br/>
            <h1 style={{ color: 'white', textAlign: 'center' }}>DOODH WAALA</h1>
            <br/>
            <h3 style={{ color: 'white', textAlign: 'center' }}>Sign In to App</h3>
            <Stack id='login-form' component='form' onSubmit={event => handleSubmit(event, customerID, password, navigateToPath)}>
                <TextField
                    fullWidth
                    className="text-field"
                    variant="outlined"
                    label='User ID'
                    size='large'
                    inputRef={userIDRef}
                    sx={styleOfTextField}
                    onBlur={event => setCustomerID(event.target.value)}
                >
                </TextField>
                <TextField
                    fullWidth
                    className="text-field"
                    variant="outlined"
                    label='Password'
                    type='password'
                    size='large'
                    sx={styleOfTextField}
                    onBlur={event => setPassword(event.target.value)}
                >
                </TextField>
                <Button 
                    id='signin'
                    variant='contained'
                    type='submit'
                    size='large'
                    color='primary'
                    sx={{ 
                        width: '400px',
                        fontWeight: 'bold',
                        fontSize: '18px'
                    }}
                    
                >
                    Sign In
                </Button>
                <hr style={{ width: '400px', height: '0px', color: 'gray', backgroundColor: 'gray' }} />
                <Button 
                    variant='contained' 
                    size='large' 
                    sx={styleOfButton} 
                    onClick={() => {navigateToPath("/signup")}}
                >
                    Sign Up
                </Button>
            </Stack>
        </>
    );
}

export default LoginForm;
