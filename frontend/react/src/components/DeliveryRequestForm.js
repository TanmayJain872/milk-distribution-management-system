/* jshint esversion: 9 */

import { Box, Button, ButtonGroup, InputAdornment, MenuItem, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import "../App.css";
import SmartTiles from "./SmartTiles";


// STYLE OF FORM ELEMENTS


const styleOfTextFields = {
    width: "230px",
    borderRadius: "4px",
    backgroundColor: "white"
};


const handleSubmit = (event, customerID, quantityOfProduct) => {
    event.preventDefault();
    if (customerID.length !== 5 || !quantityOfProduct.length) {
        console.log("Missing Input(s)!! Please specify both the Customer ID and Amount to make the delivery request.");
        alert("Missing Input(s)!! Please specify both the Customer ID and Amount to make the delivery request.");
        return;
    }
    makeHTTPPostRequest(customerID, quantityOfProduct);
};

const makeHTTPPostRequest = (idOfCustomer, amountToBeSent) => {
    let urlOfApplication = new URL("http://localhost:3001/api/milk/orders/");
    const options = {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }, 
        body: {}
    };
    options.body = JSON.stringify({customerID: idOfCustomer, quantity: amountToBeSent});
    fetch(urlOfApplication, options)
        .then(response => {
            // if (response.status === 201) alert(`Request of ${amountToBeSent} Litres Received from ${idOfCustomer}`);
            if (response.status === 201) alert("Order Placed Successfully!");
        })
        .catch(error => console.log(error));
};


function DeliveryRequestForm({ style, ...props }) {
    
    const customerID = sessionStorage.getItem("userID");
    let [dairyProduct, selectDairyProduct] = useState("");
    let [quantity, setQuantity] = useState(0);
    const quantityRef = useRef(null);
    const dairyProducts = [
        "Milk",
        "Butter Milk",
        "Lassi",
        "Yogurt",
        "Soya Milk",
        "Cheese",
        "Paneer",
    ];

    const disabled = dairyProduct === "";

    return (
        <div>
            <h1 style={{
            }}>Place Order</h1>
            <Box 
                component="form" 
                id="order-placement-form"
                sx={style}
                onSubmit={event => handleSubmit(event, customerID, quantity)}
            >
                <TextField
                    select
                    fullWidth
                    variant="outlined"
                    label="Dairy Products"
                    size="large"
                    value={dairyProduct}
                    sx={styleOfTextFields}
                >
                    {
                        dairyProducts.map(product => (
                            <MenuItem key={product} value={product} onClick={() => selectDairyProduct(product)}>
                                {product}
                            </MenuItem>
                        ))
                    }
                </TextField>
                <br />
                <TextField
                    variant="outlined"
                    type="number"
                    label="Quantity"
                    size="large"
                    inputRef={quantityRef}
                    sx={styleOfTextFields}
                    // onBlur={event => setQuantity(event.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                Litres
                            </InputAdornment>
                        )
                    }}
                />
                <br/>
                <Button
                    id="custom-input-button"
                    variant="contained"
                    type="submit"
                    color="primary"
                    size="large"
                    // disabled={disabled}
                    sx={{ border: "1px solid" }}
                    onClick={event => setQuantity(quantityRef.current.value)}
                >
                    Add to Cart
                </Button>
                <br/>
                <hr style={{ width: "250px", height: "0px", color: "gray", backgroundColor: "gray" }} />
                <br/>
                <SmartTiles />
                {/* <ButtonGroup variant="contained">
                    <Button
                        type="submit"
                        value="0.5"
                        // disabled={disabled}
                        sx={{ width: "66.7px" }}
                        onClick={event => setQuantity(event.target.value)}
                    >
                        0.5 L
                    </Button>
                    <Button
                        type="submit"
                        value="1"
                        // disabled={disabled}
                        sx={{ width: "66.7px" }}
                        onClick={event => setQuantity(event.target.value)}
                    >
                        1 L
                    </Button>
                    <Button
                        type="submit"
                        value="1.5"
                        // disabled={disabled}
                        sx={{ width: "66.7px" }}
                        onClick={event => setQuantity(event.target.value)}
                    >
                        1.5 L
                    </Button>
                </ButtonGroup> */}
                {/* <ButtonGroup variant="contained">
                    <Button
                        type="submit"
                        value="2"
                        // disabled={disabled}
                        sx={{ width: "66.7px" }}
                        onClick={event => setQuantity(event.target.value)}
                    >
                        2 L
                    </Button>
                    <Button
                        type="submit"
                        value="2.5"
                        // disabled={disabled}
                        sx={{ width: "66.7px" }}
                        onClick={event => setQuantity(event.target.value)}
                    >
                        2.5 L
                    </Button>
                    <Button
                        type="submit"
                        value="3"
                        // disabled={disabled}
                        sx={{ width: "66.7px" }}
                        onClick={event => setQuantity(event.target.value)}
                    >
                        3 L
                    </Button>
                </ButtonGroup> */}
            </Box>
        </div>
    )
}

export default DeliveryRequestForm;
