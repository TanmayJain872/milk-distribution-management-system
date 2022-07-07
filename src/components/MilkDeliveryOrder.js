/* jshint esversion: 9 */

/* This component lets user place milk delivery orders */

import React, { useEffect, useState } from 'react';

let urlOfApplication = new URL('http://localhost:3001/api/milk/data/');
const options = {
    method: "POST", 
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }, 
    body: {}
};

// STYLE OF FORM ELEMENTS

const styleOfForm1 = {
    float: 'left', 
    marginLeft: '120px'
};

const labelStyle = {
    fontSize: '25px', 
    fontFamily: 'Times New Roman', 
    textAlign: 'Center', 
    paddingRight: '20px'
};

const styleOfOr = {
    textAlign: 'center', 
    marginLeft: '23px'
};

const styleOfInputTags = {
    height: '25px', 
    width: '200px', 
    border: '1px solid black'
};

const styleOfAmountInputTag = {
    height: '25px', 
    width: '200px', 
    border: '1px solid black', 
    marginLeft: '48px'
};

const styleOfButton = {
    width: '100px', 
    borderColor: 'gray', 
    color: 'white', 
    backgroundColor: 'rgba(0, 89, 255, 0.719)',
    marginLeft: '10px', 
    paddingTop: '5px', 
    paddingBottom: '5px', 
    paddingLeft: '10px', 
    paddingRight: '10px'
};

const styleOfSmartTiles = {
    display: 'grid',
    gridTemplateColumns: '66.7px 66.7px 66.7px',
    marginLeft: '158px'
};

const styleOfTile = {
    width: '66.7px',
    height: '35px',
    backgroundColor: 'whitesmoke',
    border: '1.3px solid gray',
    color: 'black'
};

const handleSubmit = (event, customerID, amount) => {
    event.preventDefault();
    if (customerID.length !== 5 || !amount.length) {
        alert('Missing Input(s)!! Please specify both the Customer ID and Amount to make the delivery request.');
        return;
    }
    makeHTTPPostRequest(urlOfApplication, customerID, amount);
    alert(`Request of ${amount} Litres Received from ${customerID}`);
};

const handleClickOfDefaultInputButtons = (event, customerID) => {
    event.preventDefault();
    handleSubmit(event, customerID, event.target.id);
};

const makeHTTPPostRequest = (url, idOfCustomer, amountToBeSent) => {
    options.body = JSON.stringify({customerID: idOfCustomer, quantity: amountToBeSent});
    fetch(url, options)
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(error => console.log(error));
};

function MilkDeliveryOrder(props) {
    
    let [customerID, setCustomerID] = useState('');
    let [quantityOfMilk, setQuantityOfMilk] = useState(0);

    const disabled = customerID === '';

    useEffect(() => {
        console.log("Form1 Customer ID = " + customerID);
        console.log("Form1 Quantity of Milk = " + quantityOfMilk);
    }, [customerID, quantityOfMilk]);

    return (
        <form id='milk-form-1' style={styleOfForm1}>
            <label style={labelStyle}>Customer ID:</label>
            <input 
                type='text'
                onBlur={event => {setCustomerID(event.target.value); props.changeCustomerID(event.target.value)}}
                placeholder='Enter Customer ID'
                style={styleOfInputTags}
            />
            <br/>
            <br/>
            <label style={labelStyle}>Amount:</label>
            <input 
                type='number'
                min='0.25'
                step='0.25'
                onBlur={event => setQuantityOfMilk(event.target.value)}
                placeholder='Enter quantity of milk in Litres'
                style={styleOfAmountInputTag}
            />
            <button 
                id='general' 
                type="submit" 
                style={styleOfButton} 
                onClick={event => handleSubmit(event, customerID, quantityOfMilk)} 
                disabled={disabled}
            >
                Submit
            </button>
            <br/>
            <br/>
            <div style={styleOfOr}><label>OR</label></div>
            <br/>
            <div style={styleOfSmartTiles}>
                <input 
                    id='0.5' 
                    type="submit" 
                    style={styleOfTile} 
                    value='0.5 L' 
                    onClick={event => {
                        setQuantityOfMilk(event.target.id); 
                        handleClickOfDefaultInputButtons(event, customerID);
                    }} 
                    disabled={disabled} 
                />
                <input 
                    id='1.0' 
                    type="submit" 
                    style={styleOfTile} 
                    value='1.0 L' 
                    onClick={event => {
                        setQuantityOfMilk(event.target.id); 
                        handleClickOfDefaultInputButtons(event, customerID);
                    }} 
                    disabled={disabled} 
                />
                <input 
                    id='1.5' 
                    type="submit" 
                    style={styleOfTile} 
                    value='1.5 L' 
                    onClick={event => {
                        setQuantityOfMilk(event.target.id); 
                        handleClickOfDefaultInputButtons(event, customerID);
                    }} 
                    disabled={disabled} 
                />
                <input 
                    id='2.0' 
                    type="submit" 
                    style={styleOfTile} 
                    value='2.0 L' 
                    onClick={event => {
                        setQuantityOfMilk(event.target.id); 
                        handleClickOfDefaultInputButtons(event, customerID);
                    }} 
                    disabled={disabled} 
                />
                <input 
                    id='2.5' 
                    type="submit" 
                    style={styleOfTile} 
                    value='2.5 L' 
                    onClick={event => {
                        setQuantityOfMilk(event.target.id); 
                        handleClickOfDefaultInputButtons(event, customerID);
                    }} 
                    disabled={disabled} 
                />
                <input 
                    id='3.0' 
                    type="submit" 
                    style={styleOfTile} 
                    value='3.0 L' 
                    onClick={event => {
                        setQuantityOfMilk(event.target.id); 
                        handleClickOfDefaultInputButtons(event, customerID);
                    }} 
                    disabled={disabled} 
                />
            </div>
        </form>
    )
}

export default MilkDeliveryOrder;
