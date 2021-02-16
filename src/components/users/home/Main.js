import React from 'react';
import {Card} from 'react-bootstrap';
import {Button} from 'antd';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Home.css';
import InfoList from './InfoList';


class Main extends React.Component{

    render(){
        const mainMode = this.props.theme==='dark'?'bg-secondary w-100':'bg-light w-100';
        const card = this.props.theme ==='dark'?'bg-dark text-white':'text-primary';

        return (
            <div className={`${mainMode} p-2 h-100`}>
                <Card className={`${card}  p-3`}>
                    <Card.Title>
                        <h5 className={`${card}`}>ACTIONS</h5>
                    </Card.Title>
                    <Card.Body>
                        <Button 
                            className='act-btn'
                            type="primary" 
                            size="large" 
                            onClick={this.props.onAddFriend}
                        >
                            <FontAwesomeIcon icon={faPlusCircle} style={{marginRight:10}} />
                            ADD FRIEND
                        </Button>

                        <Button 
                            className='act-btn'
                            type="primary" 
                            size="large"
                            onClick={this.props.onCreateNewGroup}
                        >
                            <FontAwesomeIcon icon={faPlusCircle} style={{marginRight:10}} />
                            CREATE NEW GROUP
                        </Button>
                      

                    </Card.Body>
                    
                </Card>
                <InfoList />
            </div>
        )
    }
}
export default Main;