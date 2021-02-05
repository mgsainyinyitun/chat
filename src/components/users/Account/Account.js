import React from 'react';
import {Avatar,Dropdown,Menu} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt,faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { ROUTE } from '../../../routes/constant';
import {connect} from 'react-redux';
import {SignOut} from '../../../redux/actions';

const menu = (
    <Menu>
        <Menu.Item>
            <FontAwesomeIcon icon={faUserEdit} style={{marginRight:5}} />
            Edit Profile
        </Menu.Item>
        <Menu.Item>
            <Link to = {ROUTE.USERS.LOGOUT} onClick={SignOut}>
                
                <FontAwesomeIcon icon={faSignOutAlt} style={{marginRight:5}} />
                Logout
            </Link>
        </Menu.Item>
    </Menu>
)

class Account extends React.Component {

    render() {
        return(
            <div className="align-self-center m-3">
                <Dropdown overlay={menu} placement = "bottomCenter" arrow>
                    <Avatar size={40} icon={<UserOutlined />} />
                </Dropdown>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return state;

}
export default connect(mapStateToProps,SignOut)(Account);