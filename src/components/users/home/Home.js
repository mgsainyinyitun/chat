import React from 'react';
import {connect} from 'react-redux';
import LeftNavigation from '../../../components/leftNavigation/LeftNavigation';
import './Home.css';
import { PAGE, ROUTE } from '../../../routes/constant';
import MainChat from '../../chats/MainChat';
import Profile from '../Profile/Profile';
import Main from './Main';
import Group from '../../Groups/Groups';
import {changeDarkTheme,changeLightTheme} from '../../../redux/actions';
import Account from '../Account/Account';
import 'animate.css';
import { Redirect } from 'react-router-dom';
import { Spin,Drawer } from 'antd';
import AddFriendModal from './Friends/AddFriendModal';
import NotificationDrawer from './NotificationDrawer/NotificationDrawer';

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            theme:'light',
            fetching:true,
            addFriendModalVisible:false,
            authUserName:'',
            notiDrawerVisible:false,
        }
    }
    changeTheme = value => {
        this.setState({
          theme: value ? 'dark' : 'light',
        });
    };
    componentDidMount = () =>{
        console.log("prameter:",this.props.match.params.id)

    }

    componentDidUpdate = () =>{
       console.log("Final State:",this.props);
       console.log("FriendList:::",this.props.friend.friends_list);
    }

    openNotiDrawer = ()=>{
        this.setState({
            notiDrawerVisible:true,
        })
    }
    onNotiDrawerClose = () =>{
        this.setState({
            notiDrawerVisible:false,
        })
    }
    renderBody = (page) => {
        switch (page) {
            case PAGE.USERS.HOME:
                return <Main theme = {this.state.theme}/>
            case PAGE.FRIENDS.CHAT:
                return(
                <MainChat 
                    friendId = {this.props.match.params?this.props.match.params.id:null}
                    friendList = {this.props.friend.friends_list}
                />
                )
            case PAGE.USERS.PROFILE:
                return <Profile/>
            case PAGE.FRIENDS.GROUPS.MAIN:
                return <Group theme = {this.state.theme}/>
            case PAGE.FRIENDS.GROUPS.CHAT:
                return <MainChat />
            default:
                return <div>Nothing</div>
        }
    }

    render(){
        const mode = this.state.theme==='dark'?'home-dark':'home-light'
        const mainMode = this.state.theme==='dark'?'main-dark w-100':'main-light w-100';
        if(this.props.authUser === null){ // user not login
            return <Redirect to={ROUTE.USERS.LOGIN} />
        }
        
    
        if(!this.props.fetching){ // not fetching
            return(
                <div className='h-100'>
                    <div className={`${mode} d-flex flex-row-reverse justify-content-between`}>
                        <Account 
                            userinfo = {this.props.authUser.user}
                            openNotiDrawer={this.openNotiDrawer}
                        />
                    </div>
                    <hr style={{margin:0}}/>
    
                    <div className='d-flex'>
                        <LeftNavigation 
                            theme={this.state.theme} 
                            changeTheme = {this.changeTheme} 
                            onAddFriend = {()=>this.setState({addFriendModalVisible:true})}
                            friends = {this.props.friend.friends_list}
                        />
                    <div className={mainMode}> 
                        {this.renderBody(this.props.page)}
                    </div>
                    </div>
                    <hr style={{margin:0}}/>
                    <div className={mode}></div> 
                    <NotificationDrawer
                        visible={this.state.notiDrawerVisible}
                        onClose={this.onNotiDrawerClose}
                    />
                    <AddFriendModal
                        visible={this.state.addFriendModalVisible}
                        onCancel={()=>this.setState({addFriendModalVisible:false})}
                    />
                </div>
            )
        }else if(this.props.fetching){
            return <Spin/>
        }
    }
}
const mapStateToProps = (state) => {
    return state;
}
export default connect(mapStateToProps,
    {changeDarkTheme,changeLightTheme})(Home);





