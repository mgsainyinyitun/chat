import React from 'react';
import {connect} from 'react-redux';
import LeftNavigation from '../../../components/leftNavigation/LeftNavigation';
import './Home.css';
import { PAGE, ROUTE } from '../../../routes/constant';
import MainChat from '../../chats/MainChat';
import Profile from '../Profile/Profile';
import Main from './Main';
import Group from '../../Groups/Groups';
import Account from '../Account/Account';
import 'animate.css';
import { Redirect } from 'react-router-dom';
import { Spin,Drawer } from 'antd';
import AddFriendModal from './Friends/AddFriendModal';
import NotificationDrawer from './NotificationDrawer/NotificationDrawer';
import NewGroupModal from '../home/Groups/NewGroupModal';


class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            fetching:true,
            addFriendModalVisible:false,
            newGroupModalVisible:false,
            authUserName:'',
            notiDrawerVisible:false,
        }
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
                return <Main theme = {this.props.theme}/>
            case PAGE.FRIENDS.CHAT:
                return(
                <MainChat 
                    friendId = {this.props.match.params?this.props.match.params.id:null}
                    friendList = {this.props.friend.friends_list}
                />
                )
            case PAGE.USERS.PROFILE:
                return <Profile theme={this.props.theme}/>
            case PAGE.FRIENDS.GROUPS.MAIN:
                return <Group theme = {this.props.theme}/>
            case PAGE.FRIENDS.GROUPS.CHAT:
                return <MainChat theme={this.props.theme}/>
            default:
                return <div>Nothing</div>
        }
    }

    render(){
        const mode = this.props.theme==='dark'?'home-dark':'home-light'
        const mainMode = this.props.theme==='dark'?'main-dark w-100':'main-light w-100';

        const isLogin = this.props.authUser.user.data;

        if(isLogin === null){ // user not login
            return <Redirect to={ROUTE.USERS.LOGIN} />
        }

        if(!this.props.fetching){ // not fetching
            return(
                <div className='h-100'>
                    <div className={`${mode} d-flex flex-row-reverse justify-content-between`}>
                        <Account 
                            userinfo = {this.props.authUser.user}
                            openNotiDrawer={this.openNotiDrawer}
                            theme = {this.props.theme}
                        />
                    </div>
                    <hr style={{margin:0}}/>
    
                    <div className='d-flex'>
                        <LeftNavigation 
                            onAddFriend = {()=>this.setState({addFriendModalVisible:true})}
                            onCreateNewGroup = {()=>this.setState({newGroupModalVisible:true})}
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
                        theme = {this.props.theme}
                    />
                    <AddFriendModal
                        visible={this.state.addFriendModalVisible}
                        onCancel={()=>this.setState({addFriendModalVisible:false})}
                    />
                    <NewGroupModal
                        visible={this.state.newGroupModalVisible}
                        onCancel = {()=>this.setState({newGroupModalVisible:false})}
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
    {})(Home);





