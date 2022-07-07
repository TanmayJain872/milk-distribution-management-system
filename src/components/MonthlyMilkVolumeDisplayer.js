/* jshint esversion: 9 */

/* This component let's user access the total volume of milk ordered by them in a particular month */

import React, { useEffect, useReducer, useState } from 'react';
import Dropdown from 'react-dropdown';

const listOfYears = [1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 
    2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040, 2041, 2042, 2043, 2044, 
    2045, 2046, 2047, 2048, 2049, 2050, 2051, 2052, 2053, 2054, 2055, 2056, 2057, 2058, 2059, 2060];

const styleOfForm = {
    float: 'right', 
    paddingRight: '400px', 
    marginRight: '-120px'
};

const styleOfLabel = {
    fontSize: '25px', 
    fontFamily: 'Times New Roman', 
    textAlign: 'Center', 
    paddingRight: '20px', 
};

const styleOfMonthDropdown = {
    float: 'right', 
    border: '1px solid black', 
    marginTop: '3px', 
    backgroundColor: 'whitesmoke'
};

const styleOfYearDropdown = {
    float: 'right', 
    marginLeft: '2px', 
    marginTop: '3px', 
    border: '1px solid black', 
    backgroundColor: 'whitesmoke'
};

const styleOfButton = {
    width: '100px',
    borderColor: 'black',
    color: 'white',
    backgroundColor: 'rgba(0, 89, 255, 0.719)',
    marginLeft: '20px',
    marginRight: '-50px',
    paddingTop: '5px',
    paddingBottom: '5px',
    paddingLeft: '10px',
    paddingRight: '10px',
    float: 'right'
};

const styleOfTotal = {
    fontSize: '20px', 
    fontFamily: 'Times New Roman', 
    textAlign: 'Center', 
    float: 'right', 
    marginRight: '-2px', 
    marginTop: '1.5px',
    border: '1px solid black'
};

const initialDropdownsState = '';
const reducer = (currentState, action) => {
    switch (action.type) {
        case 'change':
            return action.value;
        default:
            return currentState;
    }
};

const handleSubmit = (customerID, listOfMonths, month, year, setTotalAmountOfMilk, event) => {
    event.preventDefault();
    if (customerID.length === 5 && month && year) {
        let urlOfApplication = new URL(`http://localhost:3001/api/milk/data/${customerID}/${listOfMonths.indexOf(month) + 1}/${year}`);
        makeHTTPGetRequest(urlOfApplication, setTotalAmountOfMilk);
    }
    else {
        alert('Missing Input(s)!! Please specify the Customer ID, Month and Year to know the total amount of milk ordered in that particular month.');
        return;
    }
    
};

const makeHTTPGetRequest = (url, setTotal) => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data !== null) {
                setTotal(data + "   Litres");
            } else {
                alert(`No Data Found for the given search criteria. Please make sure that the values of input are correct.`);
                return;
            }
        })
        .catch(error => console.log(error));
};

function MonthlyMilkVolumeDisplayer(props) {
    
    const [totalQuantityOfMilkOrderedInAMonth , setTotalQuantityOfMilkOrderedInAMonth] = useState('');
    const [month, dispatchForMonth] = useReducer(reducer, initialDropdownsState);
    const [year, dispatchForYear] = useReducer(reducer, initialDropdownsState);
    const {customerID, listOfMonths} = props;

    useEffect(() => {
        console.log('Form 2 Month = ' + month);
        console.log('Form 2 Year = ' + year);
    }, [month, year]);

    return (
        <form style={styleOfForm}>
            <label style={styleOfLabel}>Month:</label>
            <input type="submit" style={styleOfButton} onClick={event => handleSubmit(customerID, listOfMonths, month, year, setTotalQuantityOfMilkOrderedInAMonth, event)} />
            <div style={styleOfYearDropdown}>
                <Dropdown options={listOfYears} onChange={event => dispatchForYear({ type: 'change', value: event.value })} value={''} placeholder='Year'/>
            </div>
            <div style={styleOfMonthDropdown}>
                <Dropdown options={listOfMonths} onChange={event => dispatchForMonth({ type: 'change', value: event.value })} value={''} placeholder='Select a Month'/>
            </div>
            <br/>
            <br/>
            <label style={styleOfLabel}>Total:</label>
            <input type='button' value='Clear' style={styleOfButton} onClick={event => setTotalQuantityOfMilkOrderedInAMonth('')} />
            <label style={styleOfTotal}>{totalQuantityOfMilkOrderedInAMonth}</label>
        </form>
    )
}

export default MonthlyMilkVolumeDisplayer;
