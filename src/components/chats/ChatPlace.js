import React from 'react';
import {connect} from 'react-redux';
import {Card} from 'react-bootstrap';
import MessageList from './Messages/MessageList';

class ChatPlace extends React.Component{

    render(){
        const style = this.props.theme === 'dark'?'bg-dark':'bg-light';
        const txtColor = this.props.theme === 'dark'?'white':'teal';
        return(
            <Card 
                className={`p-3 ${style}`}
                style={{height:"90%"}}
            >
                <Card.Title>
                   <p style={{color:`${txtColor}`}}>
                       {this.props.friend?this.props.friend.username:null}
                    </p> 
                   <hr/>
                </Card.Title>
                <Card.Body>
                    <MessageList 
                        theme = {this.props.theme}
                        messages={this.props.state.message}
                    /> 
                </Card.Body>
            </Card> 
        );
    }
}
const mapStateToProps = (state) => {
    return {
        state,
        authUser:state.authUser.user.data
    };
}
export default connect(mapStateToProps)(ChatPlace);