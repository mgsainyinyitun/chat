import React from "react";
import { Spin } from "antd";
import { Form, Input, Button } from "antd";
import { connect } from "react-redux";
import { SignUp } from "../../../redux/actions";

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      phone: "",
      password: "",
      error: null,
    };
  }
  checkPassword({ password, confirmpassword }) {
    if (password !== confirmpassword) {
      this.setState({
        error: "Password does not match",
      });
      console.log(this.state.error);
      return false;
    }
    return true;
  }

  onFinish = (values) => {
    if (this.checkPassword(values)) {
      console.log("success");
      this.setState({
        username: values.username,
        email: values.email,
        phone: values.phone,
        password: values.password,
      });
      this.props.SignUp(this.state);
    }
    // this.setState({
    //   username:values.username,
    //   email:values.email,
    //   phone:values.phone,
    //   password:values.password,
    // })
    // console.log('Success:', this.state);
    // this.props.registerUser(this.state);
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  render() {
    console.log("props", this.props);
    const loading = this.props.loading.signupLoading;
    return (
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        layout="vertical"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
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
              message: "Please input your email!",
            },
          ]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item label="Phone" name="phone">
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

        <Form.Item
          label="Confirm Password"
          name="confirmpassword"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          {loading ? (
            <>
              <Button type="primary" htmlType="submit" disabled>
                Register
              </Button>

              <Spin style={{ marginLeft: 10 }} />
            </>
          ) : (
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          )}
        </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { SignUp })(RegisterForm);
