import React from "react";
import {connect} from 'react-redux';
import { Menu, Switch,Button,Badge } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faUserFriends,faCog,faUsers,faHome, faPlus, faAddressBook, faLanguage, faAdjust, faFlag, faDesktop } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom';
import { ROUTE } from '../../routes/constant';
import {
    changeTheme,
    setCurrentChatFriend,
    setCurrentGroup,
    changeLanguage,
  } from '../../redux/actions';

import './LeftNavigation.css'
const { SubMenu } = Menu;


const LABEL_ENGLISH = {
  'home':'HOME',
  'profile':'PROFILE',
  'friends':'FRIENDS',
  'groups':'GROUPS',
  'about_us':'ABOUT US',
  'setting':'SETTING',

  'add_friend':'ADD FRIEND',
  'create_group:':'CREATE GROUP',

  'dark_theme':'DARK THEME',
  'language':'LANGUAGE',

  'myanmar':'MYANMAR',
  'english':'ENGLISH',

  'on':'ON',
  'off':'OFF',
}

const LABEL_MYANMAR = {
  'home':'မူလ နေရာ',
  'profile':'ပရိုဖိုင်',
  'friends':'သူငယ်ချင်းများ',
  'groups':'အဖွဲ့များ',
  'about_us':'ကျွန်တော်တို့ အကြောင်း',
  'setting':'ဆက်တင်များ',

  'add_friend':'သူငယ်ချင်း ဖွဲ့မယ်',
  'create_group':'အဖွဲ့ ဖွဲ့မယ်',

  'dark_theme':'အနက် ပုံစံ ',
  'language':'ဘာသာစကား',

  'myanmar':'မြန်မာ',
  'english':'အင်္ဂလိပ်',

  'on':'ဖွင့်',
  'off':'ပိတ်',
}

class LeftNavigation extends React.Component{

 constructor (props){
   super(props);
   this.state = {
     theme:this.props.theme,
     fullScreenMode:false,
     language:this.props.language || 'english',
   }
 }
 componentDidMount = () => {
  console.log('Language is:',this.state.language);
 }

  fullScreenToggler = () =>{  
    this.setState({
      fullScreenMode:!this.state.fullScreenMode,
    });
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

  onLanguageChange = language =>{
    this.props.changeLanguage(this.props.authUser,language);
    this.setState({
      language:language,
    })
    console.log('Language Change to:',language);
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
          <Link to= {`${ROUTE.FRIENDS.GROUPS.MAIN}/${group.groupId}`} >{group.name}</Link>

        </Menu.Item>
      )
    })
  }



 render(){
   var label = null;
   if(this.state.language == 'english'){
      label = LABEL_ENGLISH;
   }else{
      label = LABEL_MYANMAR;
   }
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
            <Link to="/">{label.home}</Link>
          </Menu.Item>

          <Menu.Item key="sub1" icon={<FontAwesomeIcon icon = {faUser} style={{marginRight:'10px'}}/>} title="PROFILE">
          <Link to="/profile">{label.profile}</Link>
          </Menu.Item>

          <SubMenu key="FRIEND" icon={<FontAwesomeIcon icon = {faUserFriends} style={{marginRight:'10px'}}/>} title={label.friends}>
            <Menu.Item key="add-friend">
              <Button 
                onClick={this.props.onAddFriend}
              ><FontAwesomeIcon icon={faPlus} style={{marginRight:10}}/> {label.add_friend}</Button>
            </Menu.Item>
            {this.renderFriends(this.props.friends)}

          </SubMenu>
          <SubMenu key="GROUP" icon={<FontAwesomeIcon icon = {faUsers} style={{marginRight:'10px'}}/>} title={label.groups}>
            <Menu.Item key="add-friend">
              <Button 
                onClick={this.props.onCreateNewGroup}
              ><FontAwesomeIcon icon={faPlus} style={{marginRight:10}}/>{label.create_group}</Button>
            </Menu.Item>
            {this.renderGroups(this.props.groups)}
            
          </SubMenu>

          <SubMenu key="sub4" icon={<FontAwesomeIcon icon = {faCog} style={{marginRight:'10px'}}/>} title={label.setting}>
            <Menu.Item key="settings">
              <span style={{marginRight:10}}>
                <FontAwesomeIcon icon={faAdjust} style = {{marginRight:10}}/>
                {label.dark_theme}
              </span>
              <Switch
                    checked={this.props.theme === 'dark'}
                    onChange={this.onThemeChangeTheme}
                    checkedChildren={label.on}
                    unCheckedChildren={label.off}
                />
            </Menu.Item>

          <SubMenu key='language' icon={<FontAwesomeIcon icon={faLanguage} style={{marginRight:10}} />} title = {label.language}>
              <Menu.Item key="myan" icon={<FontAwesomeIcon icon = {faFlag} style={{marginRight:'10px'}}/>} title="myanmar">
                <span onClick={()=> this.onLanguageChange('myanmar')}>
                  {label.myanmar}
                </span>
              </Menu.Item>
              <Menu.Item key="eng" icon={<FontAwesomeIcon icon = {faFlag} style={{marginRight:'10px'}}/>} title="english">
                <span onClick={()=> this.onLanguageChange('english')}>
                  {label.english}
                </span>
              </Menu.Item>
          </SubMenu>

         {/* <Menu.Item key="full-screen" icon={<FontAwesomeIcon icon = {faDesktop} style={{marginRight:'10px'}}/>} title="FULLSCREEN">
            <span onClick={this.props.onFullScrren}>
            FULLSCREEN
            </span>
            
     </Menu.Item> */}

          </SubMenu>

          <Menu.Item key="aboutus" icon={<FontAwesomeIcon icon = {faAddressBook} style={{marginRight:'10px'}}/>} title="ABOUT US">
            <Link to={ROUTE.ABOUT_US}>{label.about_us}</Link>
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
      language:state.language,
      groups:state.groups.groupList,
  };
}
export default connect(mapStateToProps,{
  setCurrentChatFriend,
  changeTheme,
  setCurrentGroup,
  changeLanguage,
})(LeftNavigation);