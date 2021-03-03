import React from "react";
import { Modal, Form, Input, Button,message } from "antd";
import { connect } from "react-redux";
import {changeUserPassword} from '../../redux/actions';

class ChangePasswordModal extends React.Component {

  constructor(props){
    super(props);
    this.formRef = React.createRef();
  }

  onFinish = (values) => {
      console.log(values);
      if(values.password === values.confirmPassword){
        if(values.password.length<6){
          return message.error("Password should longer than 6 character");
        }
        this.props.changeUserPassword(values.password);
        this.props.onCancel();
      }else{
          message.error("Your password are not same!")
      }
  };

  render() {
    return (
      <Modal
        title="Change Password"
        visible={this.props.visible}
        onCancel={this.props.onCancel}
        footer={null}
        ref = {this.formRef}
      >
        <Form name="change-password" onFinish={this.onFinish} layout='vertical'>
          <Form.Item
            label="New Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input placeholder="New Password" type="password" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please Confirm your Password",
              },
            ]}
          >
            <Input placeholder="Confirm Password" type="password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Change
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
const mapStateToProps = state => {
  return state;
}


export default connect(mapStateToProps,{
  changeUserPassword,
})(ChangePasswordModal);
