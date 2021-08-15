import React from "react";
import { connect } from "react-redux";
import LeftNavigation from "../../../components/leftNavigation/LeftNavigation";
import "./Home.css";
import { PAGE, ROUTE } from "../../../routes/constant";
import MainChat from "../../chats/MainChat";
import Profile from "../Profile/Profile";
import Main from "./Main";
import Group from "../../Groups/Groups";
import Account from "../Account/Account";
import "animate.css";
import { Redirect } from "react-router-dom";
import { Spin } from "antd";
import AddFriendModal from "./Friends/AddFriendModal";
import NotificationDrawer from "./NotificationDrawer/NotificationDrawer";
import NewGroupModal from "../home/Groups/NewGroupModal";
import AboutUs from "./AboutUs/AboutUs";
import EditProfileModal from "../Profile/EditProfileModal";
import ChangePasswordModal from "../ChangePasswordModal";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addFriendModalVisible: false,
      newGroupModalVisible: false,
      authUserName: "",
      notiDrawerVisible: false,
      editProfileModalVisible: false,
      changePasswordModalVisible: false,
    };
  }

  componentDidUpdate(){
   // console.log("This PropHome:",this.props);
  }

  onToggleFullScreen = () => {
    this.homeRef.requestFullscreen();
  };
  openNotiDrawer = () => {
    this.setState({
      notiDrawerVisible: true,
    });
  };
  openEditProfile = () => {
    this.setState({
      editProfileModalVisible: true,
    });
  };
  openChangePasswordModal = () => {
    this.setState({
      changePasswordModalVisible: true,
    });
  };
  onNotiDrawerClose = () => {
    this.setState({
      notiDrawerVisible: false,
    });
  };
  renderBody = (page) => {
    switch (page) {
      case PAGE.USERS.HOME:
        return (
          <Main
            theme={this.props.theme}
            onAddFriend={() => this.setState({ addFriendModalVisible: true })}
            onCreateNewGroup={() =>
              this.setState({ newGroupModalVisible: true })
            }
          />
        );
      case PAGE.FRIENDS.CHAT:
        return (
          <MainChat
            friendId={
              this.props.match.params ? this.props.match.params.id : null
            }
            friendList={this.props.friend.friends_list}
          />
        );
      case PAGE.USERS.PROFILE:
        return (
          <Profile
            theme={this.props.theme}
            openEditProfile={this.openEditProfile}
          />
        );
      case PAGE.FRIENDS.GROUPS.MAIN:
        return <Group theme={this.props.theme} />;
      case PAGE.FRIENDS.GROUPS.CHAT:
        return <MainChat theme={this.props.theme} />;
      case PAGE.ABOUT_US:
        return <AboutUs />;
      default:
        return <div>Nothing</div>;
    }
  };

  render() {
    const mode = this.props.theme === "dark" ? "home-dark" : "home-light";
    const mainMode =
      this.props.theme === "dark" ? "main-dark w-100" : "main-light w-100";
    const txt = this.props.theme === "dark" ? "text-white" : "text-dark";
    let isLogin = false;
    let fetching = true;
    let isEmailVerified = undefined;

    if (this.props.authUser) {
      isEmailVerified = this.props.authUser.isEmailVerified
        ? this.props.authUser.isEmailVerified
        : false;
    }

    if (this.props.authUser.user) {
      isLogin = this.props.authUser.user.data ? true : false;
      fetching = this.props.authUser.fetching;
    }

    if (isLogin && fetching) {
      // Login Success But Fetching Data => Loading
      return (
        <div
          className="d-flex justify-content-center w-100 align-items-center"
          style={{ minHeight: "100vh" }}
        >
          <Spin size="large" tip="Loading ..." />
        </div>
      );
    } 
      
    else if (isLogin && !isEmailVerified) {
      return <Redirect to={ROUTE.VERIFY_EMAIL} />;
    }
    
    else if (isLogin && !fetching) {
      // not fetching
      return (
        <div className="h-100">
          <div
            className={`${mode} d-flex flex-row-reverse justify-content-between`}
          >
            {/* Upper Account */}
            <Account
              userinfo={this.props.authUser.user}
              openNotiDrawer={this.openNotiDrawer}
              openChangePasswordModal={this.openChangePasswordModal}
              theme={this.props.theme}
              openEditProfile={this.openEditProfile}
              onAddFriend={() => this.setState({ addFriendModalVisible: true })}
              onCreateNewGroup={() =>
                this.setState({ newGroupModalVisible: true })
              }
            />
          </div>
          <hr style={{ margin: 0 }} />

          {/* Left Navigation and Main Page(Right) */}
          <div className="d-flex" style={{ minHeight: "80%" }}>
            <LeftNavigation
              onAddFriend={() => this.setState({ addFriendModalVisible: true })}
              onCreateNewGroup={() =>
                this.setState({ newGroupModalVisible: true })
              }
              friends={this.props.friend.friends_list}
            />

            <div className={`${mainMode}`}>
              {this.renderBody(this.props.page)}
            </div>
          </div>
          <hr style={{ margin: 0 }} />

          {/* FOOTER  */}
          <div className={`${mode} ${txt} d-flex justify-content-center`}>
            <p className="align-self-center mt-1">
              {" "}
              Copyright <span>&#169;</span> 2021
              <span
                className={
                  this.props.theme === "dark" ? "text-info" : "text-primary"
                }
                style={{ marginRight: 5, marginLeft: 5 }}
              >
                ChatWithFriends
              </span>
              All Rights Reserved.
            </p>
          </div>
          {/* END FOOTER */}

          {/* MODALS  %*/}
          <NotificationDrawer
            visible={this.state.notiDrawerVisible}
            onClose={this.onNotiDrawerClose}
            theme={this.props.theme}
          />
          <AddFriendModal
            visible={this.state.addFriendModalVisible}
            onCancel={() => this.setState({ addFriendModalVisible: false })}
          />
          <NewGroupModal
            visible={this.state.newGroupModalVisible}
            onCancel={() => this.setState({ newGroupModalVisible: false })}
          />
          <EditProfileModal
            visible={this.state.editProfileModalVisible}
            onCancel={() => this.setState({ editProfileModalVisible: false })}
          />

          <ChangePasswordModal
            visible={this.state.changePasswordModalVisible}
            onCancel={() =>
              this.setState({ changePasswordModalVisible: false })
            }
          />
          {/* END MODALS  %*/}
        </div>
      );
    } else {
      return <Redirect to={ROUTE.USERS.LOGIN} />;
    }
  }
}
const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps)(Home);
