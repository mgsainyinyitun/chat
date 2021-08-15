import React from 'react';
import {connect} from 'react-redux';
import {Button} from 'antd';
import {Card} from 'react-bootstrap';
import { UserOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import './Profile.css';

const LABEL_ENG = {
    'personal_info':'PERSONAL INFORMATION',
    'email':'E-MAIL',
    'phone':'PHONE',
    'birthday':'BIRTHDAY',
    'gender':'GENDER',
    'address':'ADDRESS'
}

const LABEL_MYA = {
    'personal_info':'ကိုယ်ပိုင် သတင်းအချက်အလက်',
    'email':'အီးမေးလ်',
    'phone':'ဖုန်း',
    'birthday':'မွေးနေ့',
    'gender':'လိင်',
    'address':'နေရပ်လိပ်စာ'
}



class Profile extends React.Component {
    constructor (props){
        super(props);
        this.state = {
          language:this.props.language || 'english',
        }
      }

    
    render () {
        const user = this.props.authUser;
        const style = this.props.theme === 'dark'?'bg-primary text-white':'';
        const txtColor = this.props.theme === 'dark'?'white':'teal';

        var label = null;
        if(this.state.language == 'english'){
            label = LABEL_ENG;
        }else{
            label = LABEL_MYA;
        }
        
        return (
            <div className="d-flex flex-column align-items-center p-3">

                {/*<Avatar size={250} icon={<UserOutlined />} />*/}

                <image className='img-fluid' >
                    <UserOutlined style={{color:'white',fontSize:'5em'}}/>
                </image>

                <h2 className="text-primary mt-2">{user?user.username:null}</h2>

                <Card 
                    className={` ${style} p-3 info-card`}
                >
                    <Card.Title>
                        <h3 className="text-info">{label.personal_info}</h3>
                    </Card.Title>
                    <Card.Body>
                        <span style={{fontSize:"1.2em",color:`${txtColor}`}}>
                            <p className='info-row'>
                                <span className='info-title'>{label.email} :</span>
                                <hr className='hr-break'/>
                                <span style={{float:"right"}}>{user?user.email:null}</span>
                            </p>
                            <p className='info-row'>
                                <span>{label.phone} :</span>
                                <hr className='hr-break'/>
                                <span style={{float:"right"}}>{user?user.phone:null}</span>
                            </p>
                            <p className='info-row'>
                                <span>{label.birthday} : </span>
                                <hr className='hr-break'/>
                                <span style={{float:"right"}}>{user?user.birthday:null}</span>
                            </p>
                            <p className='info-row'>
                                <span>{label.gender} :</span>
                                <hr className='hr-break'/>
                                <span style={{float:"right"}}>{user?user.gender:null}</span>
                            </p>
                            <p className='info-row'>
                                <span>{label.address} :</span>
                                <hr className='hr-break'/>
                                <span style={{float:"right"}}>{user?user.address:null}</span>
                            </p>
                        </span>
                    </Card.Body>
                    
                </Card>
                <div className="w-75 d-flex justify-content-center mt-2">
                    <Button type='primary' size='large' onClick={this.props.openEditProfile}>
                        <FontAwesomeIcon icon={faPencilAlt} style={{marginRight:5}}/>
                        Edit
                    </Button>
                </div>
                
            </div>
        );
    }
}
const mapStateToProps = state =>{
    return {
        authUser:state.authUser.user.data,
        language:state.language,
    }
}
export default connect(mapStateToProps,{})(Profile);