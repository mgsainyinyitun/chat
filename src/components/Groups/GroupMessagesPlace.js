import React from 'react';
import {connect} from 'react-redux';
import {Card} from 'react-bootstrap';
import { Input,Button } from 'antd';
import { MessageFilled } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane,faTimes,faSmile } from '@fortawesome/free-solid-svg-icons';
import {sendGroupMessage} from '../../redux/actions';
import Picker from 'emoji-picker-react';

class GroupMessagesPlace extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            message:'',
            emoji:false,
        }
    }
    onEmojiClick = (e,emoji) => {
        console.log(e);
        this.setState({
            message:this.state.message.concat(emoji.emoji),
        })
    }
    onDisplayEmoji = () => {
        this.setState({
            emoji:true,
        })
    }
    onMessageChange = e =>{
        this.setState({
            message:e.target.value
        })
    }
    onSendMessage = (e) =>{
        e.stopPropagation();
        let message = {
            from:this.props.authUser.uid,
            fromName:this.props.authUser.username,
            text:this.state.message,
            time:new Date(),
            groupId:this.props.group.groupId
        }
        console.log('sent message is:::',message);
        console.log('sent group is:::',this.props.group.groupId);
        const gpId = this.props.group.groupId;
        this.props.sendGroupMessage(gpId,message);
        this.setState({
            message:'',
        });
    }

    render(){
        const style = this.props.state.theme === 'dark'?'bg-dark':'bg-light';
        return(
            <Card className={`mt-2 p-2 ${style}`}>
                {this.state.emoji?
                <span style={{position:"absolute",zIndex:1,top:-250,right:10,borderRadius:10}} className="bg-white p-1">
                    <p>
                    <FontAwesomeIcon 
                        icon={faTimes} 
                        onClick={()=> this.setState({emoji:false})}
                        style={{fontSize:"1.5em",float:"right",margin:3}}
                    />
                    </p>
                    <Picker onEmojiClick={this.onEmojiClick}/>
                </span>:null
                }
                <div className="d-flex">
                    <Input
                        value={this.state.message}
                        size="large"
                        placeholder="type message here"
                        prefix={<MessageFilled/>}
                        onChange={this.onMessageChange}
                    />
                    <Button
                        className="h-100"
                        style={{marginLeft:5,marginRight:5}}
                        onClick = {this.onDisplayEmoji}
                    >
                        <FontAwesomeIcon icon={faSmile} style = {{fontSize:"2em"}}/>
                    </Button>
                    <Button 
                    className="h-100" 
                    style={{marginLeft:5}} 
                    onClick={this.onSendMessage}
                    onKeyDown={e => console.log(e)}
                    >

                        <FontAwesomeIcon icon={faPaperPlane} style={{fontSize:"2em"}}/>
                    </Button>
                </div>
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
export default connect(mapStateToProps,{sendGroupMessage})(GroupMessagesPlace);