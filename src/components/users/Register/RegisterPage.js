import React from 'react';
import RegisterForm from './RegisterForm';
import {Card} from 'antd';

class RegisterPage extends React.Component{
    render(){
        return(
        <div className="d-flex justify-content-center align-items-center login-background">
            <Card>
                <h2 className='header mb-5'>Hello,Friend Please Register your accout</h2>
                <RegisterForm/>
            </Card>
        </div>
        )
    }
}
export default RegisterPage;