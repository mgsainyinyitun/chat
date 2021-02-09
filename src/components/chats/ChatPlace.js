import React from 'react';
import {connect} from 'react-redux';
import {Card} from 'react-bootstrap';
import MessageList from './Messages/MessageList';
import {getSentMessage} from '../../redux/actions';

class ChatPlace extends React.Component{

    render(){
        return(
            <>
            <Card 
                className="p-3"
                style={{height:"90%"}}
            >
                <Card.Title>
                   <p style={{color:"teal"}}>
                       {this.props.friend?this.props.friend.username:null}
                    </p> 
                   <hr/>
                </Card.Title>
                <Card.Body>
                    <MessageList messages={this.props.state.message}/> 
                </Card.Body>
            </Card>
            </>
            
        );
    }
}
const mapStateToProps = (state) => {
    return {
        state,
        authUser:state.authUser.user.data
    };
}
export default connect(mapStateToProps,{getSentMessage})(ChatPlace);