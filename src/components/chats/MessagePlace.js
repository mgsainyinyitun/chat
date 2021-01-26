import React from 'react';
import { Card,Input,Button } from 'antd';
import { MessageFilled } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

class MessagePlace extends React.Component{

    render(){
        return(
            <Card className="mt-2">
                <div className="d-flex">
                    <Input
                        size="large"
                        placeholder="type message here"
                        prefix={<MessageFilled/>}
                    />
                    <Button className="h-100" style={{marginLeft:5}}>
                        <FontAwesomeIcon icon={faPaperPlane} style={{fontSize:"2em"}}/>
                    </Button>
                </div>
            </Card>
        );
    }
}
export default MessagePlace;