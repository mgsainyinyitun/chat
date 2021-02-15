import React from 'react';
import {Form,Input,DatePicker,Select,Button} from 'antd';
import {connect} from 'react-redux';
import {editUserProfile} from '../../../redux/actions'

const { TextArea } = Input;
const { Option } = Select;
class EditProfileForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            birthday:'',
        }
        this.formRef = React.createRef();
    }

    onDateChane = (data,dateString) => {
        this.setState({
            birthday:dateString,
        })
    }

    initValue = () => {
        const cuser = this.props.user;
        const init = cuser?
        {
            email:cuser.email,
            phone:cuser.phone,
            address:cuser.address,
           // birthday:cuser.birthday,
            gender:cuser.gender,
            address:cuser.address,
        }:null
        console.log("initial Value::",init);
        this.formRef.current.setFieldsValue(init);
    }


    componentDidMount(){
        this.initValue();
    }
    onFormFinish = values =>{
        let data = {
            email:values.email,
            phone:values.phone,
            gender:values.gender,
            birthday:this.state.birthday,
            address:values.address,
        }
        this.props.editUserProfile(data,this.props.user);
        this.props.onCancel();
    }

    render(){
        return (
            <Form
                className='w-100'
                layout='vertical'
                name='edit-profile'
                onFinish={this.onFormFinish}
                ref={this.formRef}
            >
                <Form.Item
                    label="E-mail"
                    name='email'
                    rules={[{ required: true }]}
                >
                    <Input type='email'/>
                </Form.Item>
                <Form.Item
                    label="Phone"
                    name='phone'
                >
                    <Input />
                </Form.Item>
                <Form.Item 
                 label="Birthday"
                 name='birthday'
                >
                    <DatePicker  onChange={this.onDateChane}/>
                </Form.Item>
                <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
                    <Select
                        placeholder="Select Your Gender"
                        allowClear
                    >
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                        <Option value="other">Other</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Address"
                    name='address'
                >
                    <TextArea />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                    Change
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

export default connect(null,{editUserProfile})(EditProfileForm);