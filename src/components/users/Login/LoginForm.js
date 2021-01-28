import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {loginUser} from '../../../redux/actions';
import history from '../../../history';
import { USER } from '../../../redux/actions/Types';
import { ROUTE } from '../../../routes/constant';

class LoginForm extends React.Component{
    constructor (props) {
      super(props);
      this.state = {
        login:false,
        authUser:{
          username:'',
          password:'',
        }
      }
    }

    onFinish = (values) => {
        console.log('Success:', values);
        this.setState({
          authUser:{
            username:values.username,
            password:values.password,
          }
        })
        this.props.loginUser(this.state.authUser);
        this.setState({
          login:true,
        })
        
    };
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render = () =>  {
      if(this.state.login){
        return <Redirect to={ROUTE.USERS.HOME} />
      }
     
        return (
            
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
        
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
        
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
        
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
            </Form>
          );

    }
}
const mapStateToProps = state => {
  return state;
}
export default connect(mapStateToProps,{loginUser})(LoginForm);