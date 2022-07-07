/* jshint esversion: 9 */

/* This component diplays current date and day */

import React, { useState } from 'react';

function findDisplayDate(listOfMonths) {
    let dateToDisplay, date = new Date().toString();
    const mapOfDays = {
        'Mon': 'Monday', 
        'Tue': 'Tuesday', 
        'Wed': 'Wednesday', 
        'Thu': 'Thursday', 
        'Fri': 'Friday', 
        'Sat': 'Saturday', 
        'Sun': 'Sunday'
    };
    for (let i = 0; i < listOfMonths.length; i++) {
        if (date.substring(4, 7) === listOfMonths[i].substring(0, 3)) {
            dateToDisplay = date.substring(8, 11) + listOfMonths[i] + date.substring(10, 15) + ", " + mapOfDays[date.substring(0, 3)];
        }
    }
    return dateToDisplay;
}

function DateDispalyer(props) {

    const dateToDisplay = useState(findDisplayDate(props.months))[0];

    return (
        <React.Fragment>
            <h1 style={{ textAlign: 'center' }}>{dateToDisplay}</h1>
            <br/>
            <br/>
            <br/>
        </React.Fragment>
    )
}

export default DateDispalyer;