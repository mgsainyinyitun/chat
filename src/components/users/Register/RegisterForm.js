import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import {connect} from 'react-redux';
import {registerUser} from '../../../redux/actions';


class RegisterForm extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        username:'',
        email:'',
        phone:'',
        password:'',
      }
    }

    onFinish = (values) => {
      this.setState({
        username:values.username,
        email:values.email,
        phone:values.phone,
        password:values.password,
      })
      console.log('Success:', this.state);
      this.props.registerUser(this.state);
    };
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render(){
      console.log("props",this.props);
        return (
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
              layout='vertical'
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
                label="E-mail"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                ]}
              >
                <Input type='email'/>
              </Form.Item>

              <Form.Item
                label="Phone"
                name="phone"
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

              <Form.Item
                label="Confirm Password"
                name="comfirm-password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
            </Form>
          );

    }
}

const mapStateToProps = state =>{
  console.log("state is tar tar ::",state);
  return state;
}

export default connect(mapStateToProps,{registerUser})(RegisterForm);