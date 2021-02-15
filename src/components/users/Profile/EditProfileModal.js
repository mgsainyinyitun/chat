import React from 'react';
import {connect} from 'react-redux';
import {Modal,Avatar} from 'antd';
import EditProfileForm from './EditProfileForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

class EditProfileModal extends React.Component {
    componentDidUpdate(){
        console.log("Edit modal:::",this.props);
    }
    render(){
        return(
            <Modal
                className = 'w-50'
                visible={this.props.visible}
                onCancel={this.props.onCancel}
                title={<h3 className="text-primary">Edit Profile Information</h3>}
                footer={null}
                style={{top:20}}
            >
                <div className='d-flex flex-column align-items-center'>
                    <Avatar icon={<FontAwesomeIcon icon={faUser}/>} size={150}/>

                    <EditProfileForm 
                        user = {this.props.user} 
                        onCancel = {this.props.onCancel}
                    />
                </div>
            </Modal>
        )
    }
}
const mapStateToProps = state => {
    return {
        user:state.authUser.user.data,
    }
}
export default connect(mapStateToProps)(EditProfileModal);