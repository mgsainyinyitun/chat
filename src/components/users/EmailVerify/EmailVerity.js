import React from 'react';
import {connect} from 'react-redux';
import {Card,Button} from 'react-bootstrap';
import {sendEmailVerificationLink,SignOut} from '../../../redux/actions';
import history from '../../../history';

class EmailVerify extends React.Component{
    componentDidUpdate(){
        console.log("email verify:',",this.props);
    }

    loginWithOtherAccount = () => {
        this.props.SignOut();
        history.push('/login');
    }

    render(){
        return(
            <div className='d-flex justify-content-center align-items-center h-100'>
                <Card className='p-2 m-4'>
                    <Card.Body className='d-flex flex-column align-items-center'>
                    <h3 className='text-primary text-bold'>Verify Your Email Address</h3>
                        <p>Please comfirm that you want to use 
                             <span className="m-1 text-primary">{this.props.user?this.props.user.email:''}</span>
                            as your 
                            <span className='m-1 text-info'>ChatWithFriends</span>
                            account email address.
                        </p>
                        <Button 
                            style={{backgroundColor:'green',maxWidth:'60%',width:'100%'}}
                            onClick = {this.props.sendEmailVerificationLink}
                        >
                            Verify My Email
                        </Button>
                        <span>OR</span>
                        <Button 
                            style={{backgroundColor:'blue',maxWidth:'40%',width:'100%'}}
                            onClick = {()=> this.loginWithOtherAccount()}
                        >
                            Login With Other Account
                        </Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
const mapStateToProps = state =>{
    return{
        user:state.authUser.user.data,
    }
}
export default connect(mapStateToProps,{sendEmailVerificationLink,SignOut})(EmailVerify);