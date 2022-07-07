/* jshint esversion: 9 */

import React, { useState, useEffect } from 'react';
import './App.css';
import DateDisplayer from './components/DateDisplayer';
import MilkDeliveryOrder from './components/MilkDeliveryOrder';
import MonthlyMilkVolumeDisplayer from './components/MonthlyMilkVolumeDisplayer';

const listOfMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function App() {

  const [customerID, setCustomerID] = useState('');

  useEffect(() => {
    console.log("App Customer ID = " + customerID);
  }, [customerID]);
  

  return (
    <div>
      <DateDisplayer months={listOfMonths}/>
      <MilkDeliveryOrder changeCustomerID={id => setCustomerID(id)} />
      <MonthlyMilkVolumeDisplayer customerID={customerID} listOfMonths={listOfMonths}/>
    </div>
  );
}

export default App;
