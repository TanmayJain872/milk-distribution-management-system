/* jshint esversion: 6 */
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { theme, ThemeProvider } from './components/CustomAppTheme';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Home from './components/Home';

export const CustomerIDsContext = React.createContext('');

function App() {
  let [customerID, setCustomerID] = useState('');
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/' element={
          <CustomerIDsContext.Provider value={[customerID, setCustomerID]}>
            <LoginForm />
          </CustomerIDsContext.Provider>
        } />
        <Route path='/home' element={
          <CustomerIDsContext.Provider value={[customerID, setCustomerID]}>
            <Home />
          </CustomerIDsContext.Provider>
        } />
        <Route path='/signup' element={<RegistrationForm />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;