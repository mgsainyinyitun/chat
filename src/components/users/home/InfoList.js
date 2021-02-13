import React from 'react';
import { List,Avatar } from 'antd';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {CardGroup,Card} from 'react-bootstrap'
import { faCog,faUser, faUserFriends } from '@fortawesome/free-solid-svg-icons';

class InfoList extends React.Component {
    constructor(props){
        super(props);
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
                        title={<span className={style}>{gp.name}</span>}
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
                <List.Item>
                    <List.Item.Meta
                    avatar={<Avatar icon={<FontAwesomeIcon icon={faUser}/>}/>}
                    title={<span className={style}>{fri.username}</span>}
                    />
                    <div><FontAwesomeIcon icon={faCog} style={{fontSize:'1.5em',color:'white'}}/></div>
                </List.Item>
                
            )}
        >
        </List>
       )
        
    }



    render(){
        const mainMode = this.props.theme==='dark'?'bg-secondary w-100':'bg-light w-100';
        const card = this.props.theme ==='dark'?'bg-dark text-white':'text-primary';
        const Lgroups = this.props.groups.groupList;
        console.log("group list:",Lgroups);
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
export default connect(mapStateToProps)(InfoList);