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
import { auth } from '../../../firebase';

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            theme:'light',
        }
    }
    changeTheme = value => {
        this.setState({
          theme: value ? 'dark' : 'light',
        });
    };

    renderBody = (page) => {
        console.log(this.props.match.params.id)
        switch (page) {
            case PAGE.USERS.HOME:
                return <Main theme = {this.state.theme}/>
            case PAGE.FRIENDS.CHAT:
                return <MainChat/>
            case PAGE.USERS.PROFILE:
                return <Profile/>
            case PAGE.FRIENDS.GROUPS.MAIN:
                return <Group theme = {this.state.theme}/>
            case PAGE.FRIENDS.GROUPS.CHAT:
                console.log('group friend chat')
                return <MainChat />
            default:
                return <div>Nothing</div>
        }
    }

    render(){
        console.log("theme",this.props);
        const mode = this.state.theme==='dark'?'home-dark':'home-light'
        const mainMode = this.state.theme==='dark'?'main-dark w-100':'main-light w-100';

        if(auth.currentUser === null){
            return <Redirect to={ROUTE.USERS.LOGIN} />
        }

        return(
            <div className='h-100'>
                <div className={`${mode} d-flex flex-row-reverse`}>
                    <Account/>
                </div>
                <hr style={{margin:0}}/>

                <div className='d-flex'>
                <LeftNavigation theme={this.state.theme} changeTheme = {this.changeTheme} />

                <div className={mainMode}> 
                    {this.renderBody(this.props.page)}
                </div>
                </div>
                <hr style={{margin:0}}/>
                <div className={mode}></div> 
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return state;
}
export default connect(mapStateToProps,{changeDarkTheme,changeLightTheme})(Home);





