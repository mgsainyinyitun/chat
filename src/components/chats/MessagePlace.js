import React from 'react';
import {connect} from 'react-redux';
import {Card} from 'react-bootstrap';
import { Input,Button } from 'antd';
import { MessageFilled } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import {sendMessage} from '../../redux/actions';

class MessagePlace extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            message:'',
        }
    }
    componentDidUpdate = () =>{
        console.log("update",this.props);
    }
    onMessageChange = e =>{
        this.setState({
            message:e.target.value
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
        return(
            <Card className="mt-2 p-3">
                <div className="d-flex">
                    <Input
                        value={this.state.message}
                        size="large"
                        placeholder="type message here"
                        prefix={<MessageFilled/>}
                        onChange={this.onMessageChange}
                    />
                    <Button className="h-100" style={{marginLeft:5}} onClick={this.onSendMessage}>
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