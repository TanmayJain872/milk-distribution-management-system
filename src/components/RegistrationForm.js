/* jshint esversion: 11 */

import { Button, Stack, TextField } from '@mui/material';
import React, { useReducer, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import '../App.css';


const styleOfTextFields = {
    width: '400px',
    borderColor: 'white',
    borderRadius: '4px',
    backgroundColor: 'white',
};


const reducer = (currentState, action) => {
    switch (action.field) {
        case 'name':
            return { ...currentState, customerName: action.value };
        case 'emailID':
            return { ...currentState, customerEmailID: action.value };
        case 'contactNumber':
            return { ...currentState, customerContactNumber: action.value };
        case 'address':
            return { ...currentState, customerAddress: action.value };
        case 'pincode':
            return { ...currentState, customerPincode: action.value };
        case 'password':
            return { ...currentState, customerPassword: action.value };
        case 'all':
            return initialState;
        default:
            return currentState;
    }
};

function whiteSpacesPresentIn(string) {
    return (/\s+/).test(string);
}

function checkIfUserExists(information) {
    let type = Object.keys(information)[0];
    if (!Object.values(information)[0]) return;
    let url = new URL('http://localhost:3001/api/milk/authenticateDetail/');
    const options = {
        method: "POST", 
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }, 
        body: JSON.stringify(information)
    };
    let result = fetch(url, options)
        .then(response => response.json())
        .then(data => {
            console.log(data[type]);
            if (data[type]) {
                alert(`${type} already exists!`);
                return false;
            }
            return true;
        })
        .catch(error => console.log(error));
    return result;
}


function registerUser(event, userDetails, navigateTo) {
    event.preventDefault();
    console.log(userDetails);
    let url = new URL('http://localhost:3001/api/milk/register/');
    console.log(url);
    const options = {
        method: "POST", 
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }, 
        body: JSON.stringify(userDetails)
    };
    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert(`Account created successfully!! \nYour Customer ID is ${data.customerID} \n Please proceed to login.`);
            navigateTo("/");
        })    
        .catch(error => {
            console.log(error);
            alert("Account creation unsuccessful. Please try again.");
        });
    
}

const initialState = {
    customerName: '',
    customerEmailID: '',
    customerContactNumber: 0,
    customerAddress: '',
    customerPincode: 0,
    customerPassword: ''
};

function RegistrationForm() {

    const [customerDetails, dispatch] = useReducer(reducer, initialState);
    const nameRef = useRef(null);
    const emailIDRef = useRef(null);
    const navigateToPath = useNavigate();
    const disabled = Object.values(customerDetails).some(detail => (Boolean(detail) === false || detail[0] === ' '));

    useEffect(() => {
        nameRef.current.focus();
    }, []);
    

    return (
        <>
            <h1 style={{textAlign: 'center', color: 'white'}}>Register on DOODH WAALA</h1>
            <h3 style={{textAlign: 'center', color: 'white'}}>Create Account</h3>
            <br/>
            <Stack 
                id='registration-form'
                component='form'
                spacing={1}
                onSubmit={ event => registerUser(event, customerDetails, navigateToPath) }
            >
                <TextField 
                    className='styleOfTextFields'
                    label='Name'
                    type='text'
                    defaultValue={customerDetails.customerName}
                    inputRef={nameRef}
                    sx={styleOfTextFields}
                    onBlur={ event => {
                        let nameEntered = event.target.value.trim();
                        // if (nameEntered.split(' ').some(part => Boolean(part) === false)) {
                        //     console.log(event.target.value);
                        //     alert('Please enter a valid name.')
                        //     nameRef.current.value = '';
                        //     // return;
                        // }
                        dispatch({ field: 'name', value: nameEntered });
                    }}
                />
                <TextField 
                    className='styleOfTextFields'
                    label='E-mail ID'
                    type='email'
                    defaultValue={customerDetails.customerEmailID}
                    sx={styleOfTextFields}
                    inputRef={emailIDRef}
                    onBlur={ async event => {
                            console.log(event.target.value);
                            let emailIDEntered = event.target.value.trim();
                            if (whiteSpacesPresentIn(emailIDEntered)) {
                                alert('Please enter a valid Email ID.');
                                emailIDRef.current.value = '';
                                return emailIDRef.current.focus();
                            }   
                            let userDontExist = await checkIfUserExists({ emailID: emailIDEntered });
                            if (userDontExist) {
                                dispatch({ field: 'emailID', value: emailIDEntered });
                            }
                        } 
                    }
                />
                <TextField 
                    className='styleOfTextFields'
                    label='Contact Number'
                    type='tel'
                    pattern="[0-9]{5}[0-9]{5}"
                    sx={styleOfTextFields}
                    onBlur={ event => dispatch({ field: 'contactNumber', value: event.target.value }) }
                />
                <TextField 
                    className='styleOfTextFields'
                    label='Address'
                    type='text'
                    sx={styleOfTextFields}
                    onBlur={ event => dispatch({ field: 'address', value: event.target.value.trim() }) }
                />
                <TextField 
                    className='styleOfTextFields'
                    label='Pincode'
                    type='number'
                    sx={styleOfTextFields}
                    onBlur={ event => dispatch({ field: 'pincode', value: event.target.value }) }
                />
                <TextField 
                    className='styleOfTextFields'
                    label='Password'
                    type='password'
                    sx={styleOfTextFields}
                    onBlur={ event => dispatch({ field: 'password', value: event.target.value.trim() }) }
                />
                <br/>
                <Button variant='contained' color='primary' size ='large' type='submit'>Register</Button>
            </Stack>
        </>
    )
}

export default RegistrationForm;
