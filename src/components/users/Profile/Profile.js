import React from 'react';
import {Avatar} from 'antd';
import { UserOutlined } from '@ant-design/icons';

class Profile extends React.Component {
    render () {
        return (
            <div className="d-flex justify-content-center p-3">
                <Avatar size={250} icon={<UserOutlined />} />
            </div>
        );
    }
}
export default Profile;