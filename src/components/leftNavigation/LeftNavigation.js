import React from "react";
import { Menu, Switch } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faUserFriends,faCog,faUsers,faHome } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom';

const { SubMenu } = Menu;

class LeftNavigation extends React.Component{
 state = {
     theme: 'dark',
     current: '1',
 }


  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

 render(){
     return(
         <>
        <Menu
          theme={this.props.theme}
          onClick={this.handleClick}
          style={{ width: 256 ,height: "90vh"}}
          defaultOpenKeys={['sub1']}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
          <Menu.Item key="home" icon={<FontAwesomeIcon icon = {faHome} style={{marginRight:'10px'}}/>} title="HOME">
            <Link to="/">HOME</Link>
          </Menu.Item>
          <Menu.Item key="sub1" icon={<FontAwesomeIcon icon = {faUser} style={{marginRight:'10px'}}/>} title="PROFILE">
          <Link to="/profile">PROFILE</Link>
          </Menu.Item>
          <SubMenu key="sub2" icon={<FontAwesomeIcon icon = {faUserFriends} style={{marginRight:'10px'}}/>} title="FRIENDS">
            <Menu.Item key="5"><Link to="/friends/chat">ExampleFrient</Link></Menu.Item>
            <Menu.Item key="6">ExampleFrient</Menu.Item>
            
          </SubMenu>
          <SubMenu key="sub3" icon={<FontAwesomeIcon icon = {faUsers} style={{marginRight:'10px'}}/>} title="GROUPS">
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
          <SubMenu key="sub4" icon={<FontAwesomeIcon icon = {faCog} style={{marginRight:'10px'}}/>} title="SETTING">
            <Menu.Item key="9">
              <span style={{marginRight:10}}>DARK MODE</span>
              <Switch
                    checked={this.props.theme === 'dark'}
                    onChange={this.props.changeTheme}
                    checkedChildren="On"
                    unCheckedChildren="Off"
                />
            </Menu.Item>
            
          </SubMenu>
        </Menu>
         </>
     )
 }
}
export default LeftNavigation;