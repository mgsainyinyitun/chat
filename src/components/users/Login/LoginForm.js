import React from "react";
import { Form, Input, Button, Checkbox, Spin } from "antd";
import { connect } from "react-redux";
import { loginUser, loginButtonLoading } from "../../../redux/actions";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: {
        email: "",
        password: "",
      },
    };
  }

  onFinish = (values) => {
    this.props.loginButtonLoading(true);
    this.setState({
      authUser: {
        email: values.email,
        password: values.password,
      },
    });

    this.props.loginUser(this.state.authUser);
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  render = () => {
    console.log(this.props);
    //const loading = this.props.state?true:false;
    console.log("btn loading:", this.props);
    const loading = this.props.loading.loginLoading;
    console.log("BTNNNNNN:", loading);

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
              message: "Please input your E-mail!",
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
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          {loading ? (
            <>
              <Button
                type="primary"
                htmlType="submit"
                disabled
                style={{ marginRight: "10px" }}
              >
                Login
              </Button>

              <Spin />
            </>
          ) : (
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          )}
        </Form.Item>
      </Form>
    );
  };
}
const mapStateToProps = (state) => {
  return {
    loading: state.loading,
  };
};
export default connect(mapStateToProps, { loginUser, loginButtonLoading })(
  LoginForm
);
