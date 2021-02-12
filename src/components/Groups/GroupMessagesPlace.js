import React from 'react';
import {connect} from 'react-redux';
import {Card} from 'react-bootstrap';
import { Input,Button } from 'antd';
import { MessageFilled } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import {sendGroupMessage} from '../../redux/actions';

class GroupMessagesPlace extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            message:'',
        }
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
            <Card className={`mt-2 p-3 ${style}`}>
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