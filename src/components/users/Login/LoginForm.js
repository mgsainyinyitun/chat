import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';


class LoginForm extends React.Component{
    onFinish = (values) => {
        console.log('Success:', values);
    };
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render(){
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
export default LoginForm;