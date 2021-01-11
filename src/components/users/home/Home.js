import React from 'react';
import { Link } from "react-router-dom";
import LeftNavigation from '../../../components/leftNavigation/LeftNavigation';
import './Home.css';

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            darkmode:true,
        }
    }
    render(){
        return(
            <div className='h-100'>
                <div className='home-header'></div>
                <div className='d-flex'>
                <LeftNavigation/>
                <div className='home-main w-100'> 
                    <nav>
                        <ul>
                            <li>
                            <Link to="/">Home</Link>
                            </li>
                            <li>
                            <Link to="/login">login</Link>
                            </li>
                            <li>
                            <Link to="/register">register</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                </div>
                <div className='home-footer'></div>
            </div>
        )
    }
}
export default Home;