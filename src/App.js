import {useEffect, useState} from 'react'
import axios from "axios";
import {usePlaidLink} from "react-plaid-link";
import { Container, Paper, Typography, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
axios.defaults.baseURL ="http://localhost:8090";

function PlaidAuth({publicToken}) {
  const [account, setAccount] = useState();

  useEffect(() => {
    async function fetchData() {
      let accessToken = (await axios.post("/api/exchange_public_token", {public_token: publicToken})).data.access_token;
      console.log("accessToken", accessToken);
      const auth = await axios.post("/api/auth", {access_token: accessToken});
      console.log("auth data ", auth.data);
      setAccount(auth.data.numbers.ach[0]);
    }
    fetchData();
  }, []);
  
  return account && (
      <Container>
        <Box>
          <Paper elevation={3}>
            <Typography variant='h3' sx={{textAlign: "center", m: 3}}>Account number: {account.account}</Typography>
            <Typography variant='h3' sx={{textAlign: "center", m: 3}}>Routing number: {account.routing}</Typography>
          </Paper>
        </Box>
        
      </Container>
  );
}

function App() {
  const [linkToken, setLinkToken] = useState();
  const [publicToken, setPublicToken] = useState();
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    async function fetch() {
      const response = await axios.post("/api/create_link_token");
      setLinkToken(response.data.link_token);
      setLoading(false);
    }
    fetch();
  }, []);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token, metadata) => {
      setPublicToken(public_token);
      console.log("success", public_token, metadata);
      // send public_token to server
    },
  });

  function StartPage(){
    return(
      <Container>
        <Typography
          variant='h1'
          sx={{my: 4, textAlign: "center", color: "primary.main"}}
        >
          Budget App
        </Typography>
        <Box sx={{display: "flex", flexDirection: {xs: "column", sm:"column"}, m:3}}>
          <Paper elevation={3}>
            <Typography variant='h3' sx={{textAlign: "center", m: 3}}>Login</Typography>
            <LoadingButton loading={loading} variant="outlined" sx={{position: "relative", justifyContent: "center", m: 3}} onClick={() => {setLoading(true);open();}} disabled={!ready}>
              <span>Connect a bank account</span>
            </LoadingButton>
          </Paper>
          
        </Box>
        
        
      </Container>
    );
  }
  return publicToken ? (<PlaidAuth publicToken={publicToken} />) : (
    <StartPage/>
  );
}

export default App