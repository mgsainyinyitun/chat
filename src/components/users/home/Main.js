import React from 'react';
import {Card} from 'react-bootstrap';
import {Button} from 'antd';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Home.css';
import InfoList from './InfoList';
import {connect} from 'react-redux';

const LABEL_ENG = {
    'action':'ACTIONS',
    'friend_list':'FRIENDS LIST',
    'group_list':'GROUP LIST',
    'add_friend':'ADD FRIEND',
    'create_group':'CREATE NEW GROUP',
}

const LABEL_MYA = {
    'action':'လုပ်ဆောင်ချက်များ',
    'friend_list':'သူငယ်ချင်းများ',
    'group_list':'အဖွဲ့များ',
    'add_friend':'သူငယ်ချင်းဖွဲ့ရန်',
    'create_group':'အဖွဲ့ ဖွဲ့ရန်',
}


class Main extends React.Component{
    constructor (props){
        super(props);
        this.state = {
          language:this.props.language || 'english',
        }
      }

      componentDidMount = () => {
        console.log('language is::::@',this.state.language);
    }
    
    render(){
        const mainMode = this.props.theme==='dark'?'bg-secondary w-100':'bg-light w-100';
        const card = this.props.theme ==='dark'?'bg-dark text-white':'text-primary';

        var label = null;
        if(this.state.language == 'english'){
            label = LABEL_ENG;
        }else{
            label = LABEL_MYA;
        }


        return (
            <div className={`${mainMode} p-2 h-100`}>
                <Card className={`${card}  p-3`}>
                    <Card.Title>
                        <h5 className={`${card}`}>{label.action}</h5>
                    </Card.Title>
                    <Card.Body>
                        <Button 
                            className='act-btn'
                            type="primary" 
                            size="large" 
                            onClick={this.props.onAddFriend}
                            style={{textAlign:'left'}}
                        >
                            <FontAwesomeIcon icon={faPlusCircle} style={{marginRight:10}} />
                            {label.add_friend}
                        </Button>

                        <Button 
                            className='act-btn'
                            type="primary" 
                            size="large"
                            onClick={this.props.onCreateNewGroup}
                            style={{textAlign:'left'}}
                        >
                            <FontAwesomeIcon icon={faPlusCircle} style={{marginRight:10}} />
                            {label.create_group}
                        </Button>
                      
                    </Card.Body>
                    
                </Card>
                <InfoList
                    label={label}
                 />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language:state.language,
    }
}

export default connect(mapStateToProps,{})(Main);