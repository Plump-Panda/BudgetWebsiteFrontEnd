import React, { useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import bcrypt from 'bcryptjs';
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


function LoginForm() {
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();

  async function login(){
    let response;
    console.log(email.current.value, password.current.value);
    if(email.current.value === "" || password.current.value === ""){
      return;
    }

    try{
      response = await axios.post("/api/login", {email: email.current.value});
      if(bcrypt.compare(password.current.value, response.data.password)){
        console.log("SUCCESS");
        window.localStorage.setItem('isLoggedIn', true);
        navigate('/home', { replace: true });
      }else{
        console.log("password incorrect")
      }
    }catch(err){
      if(err.response.status === 401){
        console.log("User not found");
      }
      console.log(err);
    }

  }

  return (
    <MDBContainer className="my-2 p-5">
      <MDBCard>
        <MDBRow className='g-0'>
          <MDBCol md='5'>
            <MDBCardImage src='https://cdn.pixabay.com/photo/2015/05/31/11/25/working-791175_1280.jpg' alt="login form" className='rounded-start w-100'/>
          </MDBCol>

          <MDBCol md='7'>
            <MDBCardBody className='d-flex flex-column'>

              <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
                <span className="h1 fw-bold mb-0">Logo</span>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>

              <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" ref={email}/>
              <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" ref={password}/>

              <MDBBtn className="mb-4 px-5" color='dark' size='lg' onClick={login}>Login</MDBBtn>
              <a className="text-muted my-2" href="#!">Forgot password?</a>
              <Link to="/createaccount" style={{color: '#393f81'}}>Don't have an account? Register here</Link>

              <div className='d-flex flex-row justify-content-start my-5'>
                <a href="#!" className="small text-muted me-1">Terms of use.</a>
                <a href="#!" className="small text-muted">Privacy policy</a>
              </div>

            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer>
  );
}

export default LoginForm;