/* jshint esversion: 6 */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { theme, ThemeProvider } from './components/CustomAppTheme';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Home from './components/Home';

function App() {
  
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/' element={ <LoginForm /> } />
        <Route path='/home' element={ <Home /> } />
        <Route path='/signup' element={ <RegistrationForm /> } />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
