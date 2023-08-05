import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import CreateAccountForm from './components/CreateAccountForm';
import PlaidAuth from './components/PlaidAuth';
import MainPage from './components/MainPage';

function App() {



  // return publicToken ? (<PlaidAuth publicToken={publicToken} />) : (
  //   <StartPage/>
  // );
  return (
    <Routes>
      <Route path="/home" element={<MainPage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/plaidauth" element={<PlaidAuth />} />
      <Route path="/createaccount" element={<CreateAccountForm />} />
    </Routes>
  );
}

export default App