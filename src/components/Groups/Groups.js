import React from 'react';
import {Card} from 'antd';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GroupsList from './GroupsList';
import GroupChat from './GroupChat';

class Group extends React.Component {
    render(){
        return(
            <>
            <GroupChat />
            </>
        );
 }
}
export default Group;