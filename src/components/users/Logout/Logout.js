import React from 'react';
import './Logout.css';
import {Card} from 'antd';
import { Link } from 'react-router-dom';
import { ROUTE } from '../../../routes/constant';

class Logout extends React.Component {

    render() {
        return(
        <div className="d-flex justify-content-center  login-background">
        <div className="mt-5">
          <Card 
            title = {<h2 className="text-primary">Thank you!, <span>&#128540;</span> happy chatting </h2>}
           >
              <h4 className='text'>Thank you for using ChatWithFriend, hope u enjoy it. </h4>
              <h4 className='text'>U can <Link to= {ROUTE.USERS.LOGIN}> Login</Link> again!</h4>
          </Card>
          </div>
        </div>
        )
    }
}
export default Logout;