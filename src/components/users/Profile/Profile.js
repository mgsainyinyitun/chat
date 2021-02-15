import React from 'react';
import {connect} from 'react-redux';
import {Avatar,Button} from 'antd';
import {Card} from 'react-bootstrap';
import { UserOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

class Profile extends React.Component {
    
    render () {
        const user = this.props.authUser;
        const style = this.props.theme === 'dark'?'bg-primary text-white':'';
        const txtColor = this.props.theme === 'dark'?'white':'teal';
        
        return (
            <div className="d-flex flex-column align-items-center p-3">
                <Avatar size={250} icon={<UserOutlined />} />
                <h2 className="text-primary mt-2">{user?user.username:null}</h2>

                <Card 
                    className={`w-75 ${style} p-3`}
                >
                    <Card.Title>
                        <h3 className="text-info">Personal Information</h3>
                    </Card.Title>
                    <Card.Body>
                        <span style={{fontSize:"1.5em",color:`${txtColor}`}}>
                            <p>
                                <span>E-mail</span>
                                <span style={{float:"right"}}>{user?user.email:null}</span>
                            </p>
                            <p>
                                <span>Phone</span>
                                <span style={{float:"right"}}>{user?user.phone:null}</span>
                            </p>
                            <p>
                                <span>Birthday</span>
                                <span style={{float:"right"}}>{user?user.birthday:null}</span>
                            </p>
                            <p>
                                <span>Gender</span>
                                <span style={{float:"right"}}>{user?user.gender:null}</span>
                            </p>
                            <p>
                                <span>Address</span>
                                <span style={{float:"right"}}>{user?user.address:null}</span>
                            </p>
                        </span>
                    </Card.Body>
                    
                </Card>
                <div className="w-75 d-flex justify-content-end mt-2">
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
        authUser:state.authUser.user.data
    }
}
export default connect(mapStateToProps)(Profile);