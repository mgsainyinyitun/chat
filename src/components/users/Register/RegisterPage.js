import React from 'react';
import RegisterForm from './RegisterForm';
import {Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ROUTE } from '../../../routes/constant';
import 'animate.css';

class RegisterPage extends React.Component{
    render(){
        return(
        <div className="d-flex justify-content-center align-items-center login-background">
            <Card className="animate__animated animate__backInLeft animate__faster p-3" style={{minWidth:'30%'}}>
                <h2 className='header mb-5'>Hello,Friend Please Register your accout</h2>
                <RegisterForm/>
                <h5 style={{color:"teal"}}>Already have an account! 
                    <Link to={ROUTE.USERS.LOGIN}>  Login here</Link>
                    <span style={{marginLeft:10}}>&#128522;</span>
                </h5>
            </Card>
           
        </div>
        )
    }
}
export default RegisterPage;