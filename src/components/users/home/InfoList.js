import React from "react";
import { List, Avatar, Dropdown, Menu } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CardGroup, Card } from "react-bootstrap";
import {
  faCog,
  faOutdent,
  faTrash,
  faUser,
  faUserFriends,
  faUserSlash,
} from "@fortawesome/free-solid-svg-icons";
import {
  setCurrentChatFriend,
  setCurrentGroup,
  unFriend,
  deleteGroup,
  removeMemberFromGroup
} from "../../../redux/actions";
import { ROUTE } from "../../../routes/constant";


class InfoList extends React.Component {

  constructor(props){
    super(props);
    //console.log(props);
  }

  componentDidUpdate() {
    console.log("list of main", this.props);
  }

  onFriendSelect = (friend) => {
    this.props.setCurrentChatFriend(friend);
  };

  onGroupSelect = (group) => {
    this.props.setCurrentGroup(group);
  };
  onItemSelect = (item, type) => {
    switch (type) {
      case "FRIEND":
        this.props.setCurrentChatFriend(item);
        break;
      case "GROUP":
        this.props.setCurrentGroup(item);
        break;
      default:
        break;
    }
  };

  renderGroupsList = (groups, style) => {
    return (
      <List
        itemLayout="horizontal"
        pagination={{
          position: "top",
          showSizeChanger: true,
          defaultPageSize: 10,
          pageSizeOptions: [3, 5, 10],
        }}
        dataSource={groups}
        renderItem={(gp) => (
          <List.Item onClick={() => this.onItemSelect(gp, "GROUP")}>
            <List.Item.Meta
              avatar={
                <Avatar icon={<FontAwesomeIcon icon={faUserFriends} />} />
              }
              title={
                <Link to={`${ROUTE.FRIENDS.GROUPS.MAIN}/${gp.groupId}`}>
                  <span className={style}>{gp.name}</span>
                </Link>
              }
            />
            <Dropdown
              overlay={this.groupMenu(gp)}
              placement="bottomLeft"
              arrow
              trigger={["click"]}
            >
              <FontAwesomeIcon
                icon={faCog}
                style={{ fontSize: "1.5em", color: "white" }}
              />
            </Dropdown>
          </List.Item>
        )}
      ></List>
    );
  };

  unFriend = (friend) => {
    this.props.unFriend(friend, this.props.user);
  };

  onDeleteGroup = (group) => {
    this.props.deleteGroup(group);
  }

  onExitFromGroup = (group,user) => {
    let member = {
      email:user.email,
      uid:user.uid,
      username:user.username,
    }
    this.props.removeMemberFromGroup(group,member);
  }

  groupMenu = (group) => {
    return (
      <Menu>
        <Menu.Item onClick={()=> this.onExitFromGroup(group,this.props.user)}>
          <FontAwesomeIcon
            style={{ marginRight: 10, color: "red" }}
            icon={faOutdent}
          />
          Leave Group
        </Menu.Item>
        {group.createdBy.uid === this.props.user.uid ? (
          <Menu.Item onClick = {()=> this.onDeleteGroup(group)}>
            <FontAwesomeIcon
              style={{ marginRight: 10, color: "red" }}
              icon={faTrash}
            />
            Delete Group
          </Menu.Item>
        ) : null}
      </Menu>
    );
  };

  friendMenu = (friend) => {
    return (
      <Menu>
        <Menu.Item onClick={() => this.unFriend(friend)}>
          <FontAwesomeIcon
            style={{ marginRight: 10, color: "red" }}
            icon={faUserSlash}
          />
          Unfriend
        </Menu.Item>
      </Menu>
    );
  };

  renderFriendsList = (friends, style) => {
    return (
      <List
        itemLayout="horizontal"
        dataSource={friends}
        pagination={{
          position: "top",
          showSizeChanger: true,
          defaultPageSize: 10,
          pageSizeOptions: [3, 5, 10],
        }}
        renderItem={(fri) => (
          <List.Item onClick={this.onItemSelect(fri, "FRIEND")}>
            <List.Item.Meta
              avatar={<Avatar icon={<FontAwesomeIcon icon={faUser} />} />}
              title={
                <Link to={`/friends/chat/${fri.uid}`}>
                  <span className={style}>{fri.username}</span>
                </Link>
              }
            />
            <Dropdown
              overlay={this.friendMenu(fri)}
              placement="bottomLeft"
              arrow
              trigger={["click"]}
            >
              <FontAwesomeIcon
                icon={faCog}
                style={{ fontSize: "1.5em", color: "white" }}
              />
            </Dropdown>
          </List.Item>
        )}
      ></List>
    );
  };
  render() {
    //  const mainMode = this.props.theme==='dark'?'bg-secondary w-100':'bg-light w-100';
    const card =
      this.props.theme === "dark" ? "bg-dark text-white" : "text-primary";
    const Lgroups = this.props.groups.groupList;
    return (
      <CardGroup
        className={`mt-2`}
        style={{ maxHeight: "75%", minHeight: "75%" }}
      >
        <Card className={`${card} p-3`}>
          <Card.Title>
            <h5 className={`${card}`}>{this.props.label.friend_list}</h5>
          </Card.Title>
          <Card.Body>
            {this.renderFriendsList(this.props.friends, card)}
          </Card.Body>
        </Card>
        <div style={{ width: 8 }}></div>
        <Card className={`${card} p-3`}>
          <Card.Title>
            <h5 className={`${card}`}>{this.props.label.group_list}</h5>
          </Card.Title>
          <Card.Body>{this.renderGroupsList(Lgroups, card)}</Card.Body>
        </Card>
      </CardGroup>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.authUser.user.data,
    theme: state.theme,
    friends: state.friend.friends_list,
    groups: state.groups,
  };
};
export default connect(mapStateToProps, {
  setCurrentChatFriend,
  setCurrentGroup,
  unFriend,
  deleteGroup,
  removeMemberFromGroup
})(InfoList);
