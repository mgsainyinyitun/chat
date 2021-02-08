import React from "react";
import { Menu, Switch,Button,Badge } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faUserFriends,faCog,faUsers,faHome, faPlus } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom';
import { ROUTE } from '../../routes/constant';

const { SubMenu } = Menu;

class LeftNavigation extends React.Component{
 state = {
     theme: 'dark',
     current: '1',
 }

  componentDidUpdate = () =>{
    console.log("Friends Left",this.props.friends);
  }


  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };


  renderFriends = (friends) =>{
    return friends.map(friend =>{
      return (
        
        <Menu.Item 
          key={friend.uid}
          icon={<FontAwesomeIcon icon = {faUser} style={{marginRight:'10px'}}/>}
          title={friend.username}
        >
          <Link to="/friends/chat">
            <span>{friend.username}</span>
          </Link>
          {
            friend.status === 'pending'?
            <span style={{marginLeft:10}}>
            <Badge count={"pending"} className="site-badge-count-4" />
          </span>:null
          }
          
          
        </Menu.Item>
        
        
      )
    })

  }

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
            <Menu.Item key="add-friend">
              <Button 
                onClick={this.props.onAddFriend}
              ><FontAwesomeIcon icon={faPlus} style={{marginRight:10}}/> ADD FRIENDS</Button>
            </Menu.Item>
            {this.renderFriends(this.props.friends)}

          </SubMenu>
          <SubMenu key="sub3" icon={<FontAwesomeIcon icon = {faUsers} style={{marginRight:'10px'}}/>} title="GROUPS">
            <Menu.Item key="9">
            <Link to= {ROUTE.FRIENDS.GROUPS.MAIN} >Example Group</Link>
            </Menu.Item>
            <Menu.Item key="10">Example Group</Menu.Item>
          </SubMenu>
          <SubMenu key="sub4" icon={<FontAwesomeIcon icon = {faCog} style={{marginRight:'10px'}}/>} title="SETTING">
            <Menu.Item key="settings">
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