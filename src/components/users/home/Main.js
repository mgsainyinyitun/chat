import React from 'react';
import {Card} from 'react-bootstrap';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Home.css';



class Main extends React.Component{

    render(){
        const mainMode = this.props.theme==='dark'?'bg-secondary w-100':'bg-light w-100';
        const card = this.props.theme ==='dark'?'bg-secondary text-dark':'text-primary';

        return (
            <div className={`${mainMode} p-3 h-100`}>
                <Card className={`${card} w-25 p-3`}>
                    <span style={{fontSize:"2em"}}>
                        <FontAwesomeIcon icon={faPlusCircle} className={card}/>
                        <span className={`${card} ml-3`} style={{marginLeft:20}}>ADD FRIEND</span>
                    </span>
                </Card>
                <Card className={`${card} w-25 mt-3 p-3`}>
                    <span style={{fontSize:"2em"}}>
                        <FontAwesomeIcon icon={faPlusCircle} className={card}/>
                        <span className={`${card} ml-3`} style={{marginLeft:20}}>CREATE GROUP</span>
                    </span>
                </Card>
            </div>
        )
    }
}
export default Main;