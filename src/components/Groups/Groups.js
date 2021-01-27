import React from 'react';
import {Card} from 'antd';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GroupsList from './GroupsList';

class Group extends React.Component {
    render(){
        const mainMode = this.props.theme==='dark'?'bg-secondary w-100':'bg-light w-100';
        const card = this.props.theme ==='dark'?'bg-secondary text-dark':'text-primary';
        return(
            <div className={`${mainMode} p-3 h-100`}>
                <Card 
                    className={`${card}  mt-3`} 
                    style={{borderRadius:50,width:"20%"}}
                    bodyStyle = {{padding:"5px 10px 5px 10px"}}
                >
                    <span style={{fontSize:"2em"}}>
                        <FontAwesomeIcon icon={faPlusCircle} className={`${card}`}/>
                        <span className={`${card} ml-3`} style={{marginLeft:20}}>CREATE GROUP</span>
                    </span>
                </Card>
                <GroupsList/>
            </div>
        );
 }
}
export default Group;