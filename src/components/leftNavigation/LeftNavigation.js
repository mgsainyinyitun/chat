import React from "react";
import {connect} from 'react-redux';
import { Menu, Switch,Button,Badge } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faUserFriends,faCog,faUsers,faHome, faPlus, faAddressBook, faLanguage } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom';
import { ROUTE } from '../../routes/constant';
import {
    changeTheme,
    setCurrentChatFriend,
    setCurrentGroup,
  } from '../../redux/actions';

import './LeftNavigation.css'
const { SubMenu } = Menu;

class LeftNavigation extends React.Component{

 constructor (props){
   super(props);
   this.state = {
     theme:this.props.theme,
   }
 }

  findFriend = (friends,fid) =>{
    return friends.find(friend =>{
      return fid === friend.uid;
    })
  }
  findGroup = (groups,gid) => {
    return groups.find(group =>{
      return group.groupId === gid;
    })
  }

  onThemeChangeTheme = (value) =>{
    if(value){
      this.props.changeTheme(this.props.authUser,'dark');
      this.setState({
        theme:'dark',
      })
    }else{
      this.props.changeTheme(this.props.authUser,'light');
      this.setState({
        theme:'light',
      })
    }
  }
  handleClick = e => {
    console.log("Key Path::",e.keyPath[1]);
    switch (e.keyPath[1]) {
      case 'FRIEND':
        let friend = this.findFriend(this.props.friends,e.key);
        this.props.setCurrentChatFriend(friend);
        break;
      case 'GROUP':
        let group = this.findGroup(this.props.groups,e.key);
        this.props.setCurrentGroup(group);
        break;
      default:
        break;
    }
    
  };

  renderFriends = (friends) =>{
    return friends.map(friend =>{
      return ( 
        <Menu.Item
          key={friend.uid}
          icon={<FontAwesomeIcon icon = {faUser} style={{marginRight:'10px'}}/>}
          title={friend.username}
        >
          <Link to={`/friends/chat/${friend.uid}`}>
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


  renderGroups = (groups) => {
    return groups.map(group => {
      return (
        <Menu.Item 
          key = {group.groupId}
          icon = {<FontAwesomeIcon icon={faUserFriends} style={{marginRight:10}} />}
          title={group.name}
        >
          <Link to= {ROUTE.FRIENDS.GROUPS.MAIN} >{group.name}</Link>

        </Menu.Item>
      )
    })
  }


 render(){
     return(
         <>
        <Menu
          className = 'left-nav'
          theme={this.props.theme?this.props.theme:this.state.theme}
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

          <SubMenu key="FRIEND" icon={<FontAwesomeIcon icon = {faUserFriends} style={{marginRight:'10px'}}/>} title="FRIENDS">
            <Menu.Item key="add-friend">
              <Button 
                onClick={this.props.onAddFriend}
              ><FontAwesomeIcon icon={faPlus} style={{marginRight:10}}/> ADD FRIENDS</Button>
            </Menu.Item>
            {this.renderFriends(this.props.friends)}

          </SubMenu>
          <SubMenu key="GROUP" icon={<FontAwesomeIcon icon = {faUsers} style={{marginRight:'10px'}}/>} title="GROUPS">
            <Menu.Item key="add-friend">
              <Button 
                onClick={this.props.onCreateNewGroup}
              ><FontAwesomeIcon icon={faPlus} style={{marginRight:10}}/>Create Group</Button>
            </Menu.Item>
            {this.renderGroups(this.props.groups)}
            
          </SubMenu>

          <SubMenu key="sub4" icon={<FontAwesomeIcon icon = {faCog} style={{marginRight:'10px'}}/>} title="SETTING">
            <Menu.Item key="settings">
              <span style={{marginRight:10}}>DARK THEME</span>
              <Switch
                    checked={this.props.theme === 'dark'}
                    onChange={this.onThemeChangeTheme}
                    checkedChildren="On"
                    unCheckedChildren="Off"
                />
            </Menu.Item>
            <Menu.Item key="language" icon={<FontAwesomeIcon icon = {faLanguage} style={{marginRight:'10px'}}/>} title="language">
              <span>LANGUAGE</span>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="aboutus" icon={<FontAwesomeIcon icon = {faAddressBook} style={{marginRight:'10px'}}/>} title="ABOUT US">
            <Link to={ROUTE.ABOUT_US}>ABOUT US</Link>
          </Menu.Item>
        </Menu>
         </>
     )
 }
}
const mapStateToProps = (state) => {
  return {
      state,
      authUser:state.authUser.user.data,
      theme:state.theme,
      groups:state.groups.groupList,
  };
}
export default connect(mapStateToProps,{
  setCurrentChatFriend,
  changeTheme,
  setCurrentGroup,
})(LeftNavigation);