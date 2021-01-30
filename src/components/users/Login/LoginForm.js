import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import {connect} from 'react-redux';
import {loginUser} from '../../../redux/actions';

class LoginForm extends React.Component{
    constructor (props) {
      super(props);
      this.state = {
        authUser:{
          email:'',
          password:'',
        }
      }
    }

    onFinish = (values) => {
        this.setState({
          authUser:{
            email:values.email,
            password:values.password,
          }
        })
        this.props.loginUser(this.state.authUser);
        
    };
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render = () =>  {
      console.log(this.props);
 
        return (
            
            <Form
              name="basic"
              layout="vertical"
              initialValues={{
                remember: true,
              }}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
            >
              <Form.Item
                label="E-mail"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your E-mail!',
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


/// uid - cPDp9qQn59Wb5J3rvER8Symq22D3
/// uid - cPDp9qQn59Wb5J3rvER8Symq22D3