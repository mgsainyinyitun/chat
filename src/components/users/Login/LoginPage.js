import React from 'react';
import {Card} from 'antd';
import "animate.css";

import LoginForm from './LoginForm';
import './Login.css';
import { Link } from 'react-router-dom';
import { ROUTE } from '../../../routes/constant';


class LoginPage extends React.Component{
    render(){
        return (
          <div className="d-flex justify-content-center align-items-center login-background">
            <Card className="animate__animated animate__backInRight animate__faster">
                <h2 className='header mb-5 mr-5 ml-5'>Hello,Friend <span>&#128522;</span>Please Login</h2>
                <LoginForm/>
                <h5 className="create-one">Does not have an account! <Link to ={ROUTE.USERS.REGISTER}>Create one</Link> </h5>
            </Card>
            
          </div>
          );

    }
}
export default LoginPage;