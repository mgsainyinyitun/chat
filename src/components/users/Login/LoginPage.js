import React from 'react';
import {Card} from 'antd';

import LoginForm from './LoginForm';
import './Login.css';


class LoginPage extends React.Component{

    render(){
        return (
        <div className="d-flex justify-content-center align-items-center login-background">
          <Card>
              <h2 className='header mb-5 mr-5 ml-5'>Hello,Friend Please Login</h2>
              <LoginForm/>
          </Card>
        </div>
          
          );

    }
}
export default LoginPage;