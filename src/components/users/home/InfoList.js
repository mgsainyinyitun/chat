import React from 'react';
import { List,Avatar } from 'antd';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {CardGroup,Card} from 'react-bootstrap'
import { faCog,faUser, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import {setCurrentChatFriend,setCurrentGroup} from '../../../redux/actions';
import { ROUTE } from '../../../routes/constant';

class InfoList extends React.Component {
    onFriendSelect = (friend) =>{
        this.props.setCurrentChatFriend(friend);
    }
    
    onGroupSelect = (group) =>{
        this.props.setCurrentGroup(group);
    }
    onItemSelect = (item,type) =>{
        switch(type){
            case 'FRIEND':
                this.props.setCurrentChatFriend(item);break;
            case 'GROUP':
                this.props.setCurrentGroup(item);break;
            default:break;
        }
    }

    renderGroupsList = (groups,style) =>{
        return(
        <List
            itemLayout="horizontal"
            pagination={{
                position:'top',
                showSizeChanger:true,
                defaultPageSize:10,
                pageSizeOptions:[3,5,10]

            }}
            dataSource={groups}
            renderItem = {gp => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar icon={<FontAwesomeIcon icon={faUserFriends}/>}/>}
                        title={
                        <Link to={ROUTE.FRIENDS.GROUPS.MAIN}  >
                            <span 
                                className={style}>{gp.name}
                            </span>
                        </Link>
                        }
                    />
                    <div><FontAwesomeIcon icon={faCog} style={{fontSize:'1.5em',color:'white'}}/></div>
                </List.Item>
            )}
        >

        </List>)

    }

   

    renderFriendsList = (friends,style) =>{
       return( <List
            itemLayout="horizontal"
            dataSource={friends}
            pagination ={{
                position:'top',
                showSizeChanger:true,
                defaultPageSize:10,
                pageSizeOptions:[3,5,10]
            }}
            renderItem = { fri => (
                <List.Item onClick={this.onItemSelect(fri,'FRIEND')}>
                    <List.Item.Meta
                    avatar={<Avatar icon={<FontAwesomeIcon icon={faUser}/>}/>}
                    title={
                    <Link to={`/friends/chat/${fri.uid}`} >
                        <span className={style}>{fri.username}</span>
                    </Link>
                    }
                    />
                    <div><FontAwesomeIcon icon={faCog} style={{fontSize:'1.5em',color:'white'}}/></div>
                </List.Item>
                
            )}
        >
        </List>
       )
        
    }



    render(){
      //  const mainMode = this.props.theme==='dark'?'bg-secondary w-100':'bg-light w-100';
        const card = this.props.theme ==='dark'?'bg-dark text-white':'text-primary';
        const Lgroups = this.props.groups.groupList;
        return(
            <CardGroup className={`mt-2`} style={{maxHeight:'80%',minHeight:'80%'}}>
                <Card  className={`${card} p-3`}>
                    <Card.Title><h5 className={`${card}`}>FRIENDS LIST</h5></Card.Title>
                    <Card.Body>{this.renderFriendsList(this.props.friends,card)}</Card.Body>
                </Card>
                <div style={{width:8}}></div>
                <Card className={`${card} p-3`}>
                    <Card.Title><h5 className={`${card}`}>GROUPS LIST</h5></Card.Title>
                    <Card.Body>{this.renderGroupsList(Lgroups,card)}</Card.Body>
                </Card>
            </CardGroup>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        theme:state.theme,
        friends:state.friend.friends_list,
        groups:state.groups,
    };
}
export default connect(mapStateToProps,{
    setCurrentChatFriend,
    setCurrentGroup,
})(InfoList);