import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import bcrypt from 'bcryptjs';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';

function CreateAccountForm() {
    const navigate = useNavigate();
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const [checkboxValue,setCheckboxValue] = useState();

    async function signUp(){
        console.log("Clicked", checkboxValue, emailIsValid(email.current.value), password.current.value, confirmPassword.current.value);
        if(checkboxValue && emailIsValid(email.current.value) && passwordIsValid()){
            console.log(true);
            try{
                const response = await axios.post("/api/createaccount", {email: email.current.value, password: await bcrypt.hash(password.current.value,13)});
                if(response.status === 200){
                    window.localStorage.setItem('isLoggedIn', true);
                    navigate('/asdf', { replace: true });
                }
            }catch(err){
                console.error(err);
            }
        }else{
            alert("Email or passwords are incorrect");
        }
    }

    function emailIsValid(email){
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }

    function passwordIsValid(){
        if(password.current.value === undefined || confirmPassword.current.value === undefined){
            return false;
        }
        // To check a password between 7 to 15 characters which contain at least one numeric digit and a special character
        return password.current.value === confirmPassword.current.value && password.current.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/);
    }

    function handleCheckbox(e) {
        setCheckboxValue(e.target.checked);
    }

    return (
        <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)', height: '100vh'}}>
        <div className='mask gradient-custom-3'></div>
        <MDBCard className='m-5' style={{maxWidth: '600px'}}>
            <MDBCardBody className='px-5'>
            <h2 className="text-uppercase text-center mb-5">Create an account</h2>
            <MDBInput wrapperClass='mb-4' label='Email' size='lg' id='form2' type='email' ref={email}/>
            <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='form3' type='password' ref={password}/>
            <MDBInput wrapperClass='mb-4' label='Confirm password' size='lg' id='form4' type='password' ref={confirmPassword}/>
            <div className='d-flex flex-row justify-content-center mb-4'>
                <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I agree all statements in Terms of service' onChange={e => handleCheckbox(e)}/>
            </div>
            <MDBBtn onClick={signUp} className='mb-4 w-100 gradient-custom-4' size='lg'>Register</MDBBtn>
            </MDBCardBody>
        </MDBCard>
        </MDBContainer>
    );
}

export default CreateAccountForm;