import React from 'react';
import {connect} from 'react-redux';
import {Card} from 'react-bootstrap';
import { Input,Button } from 'antd';
import { MessageFilled } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faSmile, faTimes } from '@fortawesome/free-solid-svg-icons';
import {sendMessage} from '../../redux/actions';
import Picker from 'emoji-picker-react';

class MessagePlace extends React.Component{
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
    onMessageChange = e =>{
        this.setState({
            message:e.target.value
        })
    }
    onDisplayEmoji = () => {
        this.setState({
            emoji:true,
        })
    }
    onSendMessage = (e) =>{
        e.stopPropagation();
        console.log(this.state.message);
        let message = {
            text:this.state.message,
            time:new Date(),
        }
        this.props.sendMessage(this.props.authUser,this.props.friend,message)
        this.setState({
            message:'',
        });
    }

    render(){
        const style = this.props.theme === 'dark'?'bg-dark':'bg-light';
        return(
            <Card className={`mt-2 p-3 ${style}`}>
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
export default connect(mapStateToProps,{sendMessage})(MessagePlace);