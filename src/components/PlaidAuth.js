import {usePlaidLink, PlaidLinkOnSuccess } from "react-plaid-link";
import {useEffect, useState, useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';
axios.defaults.baseURL ="http://localhost:8090";

function PlaidAuth() {
    const navigate = useNavigate();
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
      let accessToken = (await axios.post("/api/exchange_public_token", {public_token: publicToken, email: localStorage.getItem("email")})).data.access_token;
      console.log("accessToken", accessToken);
      const auth = await axios.post("/api/auth", {access_token: accessToken});
      console.log("auth data ", auth.data);
      navigate('/home', { replace: true });
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
        <MDBContainer className="my-2 p-5">
          <MDBCard>
            <MDBRow className='g-0'>
              <MDBCol md='5'>
                <MDBCardImage src='https://cdn.pixabay.com/photo/2018/05/08/09/09/money-3382555_1280.jpg' alt="login form" className='rounded-start w-100'/>
              </MDBCol>

              <MDBCol md='7'>
                <MDBCardBody className='d-flex flex-column'>
                  <div className='d-flex flex-row mt-2'>
                    <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
                    <span className="h1 fw-bold mb-0">First Time Setup</span>
                  </div>
                  <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px', "textAlign": "center"}}>
                    When the button is clicked, a pop up will open up where you can select the bank you want to securely connect to our app.
                    We do not record any of your bank credentials and all authentication goes through secure connections.
                  </h5>
                  <MDBBtn className="mb-4 px-5" color='dark' size='lg' onClick={() => open()} disabled={!ready}>Connect a bank account</MDBBtn>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBContainer>
    );
  }
  
export default PlaidAuth;