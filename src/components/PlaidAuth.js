import {usePlaidLink, PlaidLinkOnSuccess } from "react-plaid-link";
import {useEffect, useState, useCallback} from 'react';
import { Container, Paper, Typography, Box } from '@mui/material';
import axios from "axios";
axios.defaults.baseURL ="http://localhost:8090";

function PlaidAuth() {
    const [token, setToken] = useState(null);
    // get link_token from your server when component mounts
    useEffect(() => {
      const createLinkToken = async () => {
        const response = await axios.post("/api/create_link_token");
        setToken(response.data.link_token);
      };
      createLinkToken();
    }, []);

    const onSuccess = useCallback(async (publicToken, metadata) => {
      // send public_token to your server
      // https://plaid.com/docs/api/tokens/#token-exchange-flow
      console.log(publicToken, metadata);
      let accessToken = (await axios.post("/api/exchange_public_token", {public_token: publicToken})).data.access_token;
      console.log("accessToken", accessToken);
      const auth = await axios.post("/api/auth", {access_token: accessToken});
      console.log("auth data ", auth.data);
    }, []);

    const dosmthn = async ()=> {
      
      // setData(auth.data.numbers.ach[0]);
    }
    
    const { open, ready } = usePlaidLink({
      token,
      onSuccess,
      // onEvent
      // onExit
    });
    
    return (
        // <Container>
        //   <Box>
        //     <Paper elevation={3}>
        //       <Typography variant='h3' sx={{textAlign: "center", m: 3}}>Account number: {data.account}</Typography>
        //       <Typography variant='h3' sx={{textAlign: "center", m: 3}}>Routing number: {data.routing}</Typography>
        //     </Paper>
        //   </Box>
          
        // </Container>
        <button onClick={() => open()} disabled={!ready}>
          Connect a bank account
        </button>
    );
  }
  
export default PlaidAuth;