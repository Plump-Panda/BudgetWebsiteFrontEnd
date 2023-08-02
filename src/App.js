import {useEffect, useState} from 'react'
import {usePlaidLink} from "react-plaid-link";
import { Routes, Route } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import LoginForm from './components/LoginForm';
import CreateAccountForm from './components/CreateAccountForm';
import PlaidAuth from './components/PlaidAuth';


function App() {



  // return publicToken ? (<PlaidAuth publicToken={publicToken} />) : (
  //   <StartPage/>
  // );
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/home" element={<PlaidAuth />} />
      <Route path="/createaccount" element={<CreateAccountForm />} />
    </Routes>
  );
}

export default App