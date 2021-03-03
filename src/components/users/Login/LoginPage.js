import React from 'react';
import {connect} from 'react-redux';
import {notification} from 'antd';
import {Card} from 'react-bootstrap'
import "animate.css";

import LoginForm from './LoginForm';
import './Login.css';
import { Link } from 'react-router-dom';
import { ROUTE } from '../../../routes/constant';
import {auth} from '../../../firebase';

class LoginPage extends React.Component{
    componentDidUpdate () {
      console.log("Login Page::",this.props);
    }
    openNotificationWithIcon = errors => {
      notification['error']({
        message: errors.code,
        description:errors.message,
      });
    };
    
    render(){
      console.log("Current User is ::",auth.currentUser);
      if(this.props.errors){
        this.openNotificationWithIcon(this.props.errors);
      }

        return (
          <div className="d-flex justify-content-center align-items-center login-background">
            <Card className="animate__animated animate__backInRight animate__faster p-3" style={{minWidth:"30%"}}>
                <h2 className='header mb-5 mr-5 ml-5'>Hello,Friend <span>&#128522;</span>Please Login</h2>
                <LoginForm/>
                <h5 className="create-one">Does not have an account! <Link to ={ROUTE.USERS.REGISTER}>Create one</Link> </h5>
            </Card>
          </div>
          );

    }
}

const mapStateToProps = state => {
  let errs  = null;
  if(state.authUser){
    errs = state.authUser.errors;
  }
  return {
    state,
    errors:errs,
  };
}
export default connect(mapStateToProps)(LoginPage);