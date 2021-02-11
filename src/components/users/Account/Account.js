import React from 'react';
import {Avatar,Dropdown,Menu,Drawer} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSignOutAlt,faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { ROUTE } from '../../../routes/constant';
import {connect} from 'react-redux';
import {SignOut} from '../../../redux/actions';

class Account extends React.Component {
    renderMenu = (SignOut,style) =>{
        return (
            <Menu className={`${style}`}>
                <Menu.Item>
                    <FontAwesomeIcon icon={faUserEdit} style={{marginRight:5}} />
                    Edit Profile
                </Menu.Item>
                <Menu.Item onClick={this.props.openNotiDrawer}>
                    <FontAwesomeIcon icon={faBell} style={{marginRight:5}}/>
                    Notification
                </Menu.Item>
                <Menu.Item>
                    <span onClick={SignOut}>
                    <Link to = {ROUTE.USERS.LOGOUT}>
                        <FontAwesomeIcon icon={faSignOutAlt} style={{marginRight:5,color:'black'}} />
                       <span style={{color:'black'}}>Logout</span> 
                    </Link>
                    </span>
                </Menu.Item>
            </Menu>   
        )
    }

    render() {
        const style = this.props.theme === 'dark'?'bg-primary':'';
        //const txtColor = this.props.theme === 'dark'?'white':'teal';
        return(
            <div className="align-self-center m-3 d-flex justify-content-between w-100">
                <h3 className="text-primary mt-3">{this.props.userinfo.data?this.props.userinfo.data.username:"no user"}</h3>
                <Dropdown 
                    overlay={this.renderMenu(this.props.SignOut,style)} 
                    placement = "bottomCenter" 
                    arrow 
                    className={`align-self-center ${style}`}
                    trigger= {["click"]}
                >
                    <Avatar size={40} icon={<UserOutlined />} />
                </Dropdown>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return state;

}
export default connect(mapStateToProps,{SignOut})(Account);