import React from 'react';
import {Switch} from 'antd';
import LeftNavigation from '../../../components/leftNavigation/LeftNavigation';
import './Home.css';
import { PAGE } from '../../../routes/constant';
import MainChat from '../../chats/MainChat';
import Profile from '../Profile/Profile';
import Main from './Main';

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
        console.log(page)
        switch (page) {
            case PAGE.USERS.HOME:
                return <Main theme = {this.state.theme}/>
            case PAGE.FRIENDS.CHAT:
                return <MainChat/>
            case PAGE.USERS.PROFILE:
                return <Profile/>
            default:
                return <div>Nothing</div>
        }
    }

    render(){
        const mode = this.state.theme==='dark'?'home-dark':'home-light'
        const mainMode = this.state.theme==='dark'?'main-dark w-100':'main-light w-100';
        return(
            <div className='h-100'>
                <div className={mode}>
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
export default Home;