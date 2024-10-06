/* jshint esversion: 11 */

/* This component let"s user access the total volume of milk ordered by them in a particular month */

import React, { useEffect, useState } from "react";
import { Button, InputAdornment, MenuItem, Stack, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { monthlyAmountDisplayer, styleOfTextFields } from "../styles/MonthlyAmountDisplayerStyles.js";


const handleSubmit = (customerID, selectedMonth, setTotalQuantity, event) => {
    event.preventDefault();
    const listOfMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [month, year] = selectedMonth.split(" ");
    if (month && year) {
        let urlOfApplication = new URL(`http://localhost:3001/api/milk/orders/${customerID}/${listOfMonths.indexOf(month) + 1}/${year}`);
        fetch(urlOfApplication)
            .then(response => response.json())
            .then(data => {
                setTotalQuantity(data);
                // displayFieldRef.current.focus();
            })
            .catch(error => console.log(error));
    }
    else {
        alert("Missing Input(s)!! Please specify the Customer ID, Month and Year to know the total amount of milk ordered in that particular month.");
    }
    
};


function MonthlyOrderedQuantityDisplayer(props) {
    const [totalQuantityOrdered , setTotalQuantityOrdered] = useState("");
    const [month, setMonth] = useState(dayjs(new Date()).format("MMMM YYYY"));
    const customerID = sessionStorage.getItem("userID");

    const dairyProducts = [
        "Milk",
        "Coconut Milk",
        "Soya Milk",
        "Butter Milk",
        "Yogurt",
        "Icecream"
    ];

    useEffect(() => {
        console.log("Form 2 Month = " + month);
    }, [month]);

    return (
        <div>
            <h1>Ordered Quantity</h1>
            <Stack 
                component="form"
                sx={monthlyAmountDisplayer}
                spacing={1.5}
                onSubmit={event => handleSubmit(customerID, month, setTotalQuantityOrdered, event)}
            >
                <TextField
                    select
                    fullWidth
                    variant="outlined"
                    label="Dairy Products"
                    size="large"
                    defaultValue=""
                    sx={styleOfTextFields}
                >
                    {
                        dairyProducts.map(product => (
                            <MenuItem key={product} value={product}>
                                {product}
                            </MenuItem>
                        ))
                    }
                </TextField>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                        disableFuture
                        label="Select Month"
                        variant="contained"
                        views={["year", "month"]}
                        margin="normal"
                        value={month}
                        onChange={month => setMonth(dayjs(month).format("MMMM YYYY"))}
                        renderInput={(params) => <TextField {...params} sx={styleOfTextFields} />}
                    />
                </LocalizationProvider>
                <Button 
                    variant="contained"
                    size="large"
                    type="submit"
                    sx={{ border: "1px solid" }}
                >
                    Submit
                </Button>
                <br />
                <hr style={{ width: "250px", height: "0px", color: "gray", backgroundColor: "gray" }} />
                <br />
                <TextField 
                    fullWidth
                    variant="outlined"
                    label="Total Quantity"
                    size="large"
                    value={totalQuantityOrdered}
                    sx={styleOfTextFields}
                    InputProps={{
                        readOnly: true,
                        endAdornment: <InputAdornment>Litres</InputAdornment>
                    }}
                />
            </Stack>
        </div>
    )
}

export default MonthlyOrderedQuantityDisplayer;
