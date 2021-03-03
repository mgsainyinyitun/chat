import { USER } from "./Types";
import { auth, db, fb } from "../../firebase";
import history from "../../history";
import {
  getFriendsList,
  getFriendsRequestList,
  getRealTimeMessages,
  getUserSaveTheme,
  getUserRelatedGroupsNotRealTime,
} from "../actions";

export const onAuthStateChanged = () => (dispatch) => {
  fb.auth().onAuthStateChanged(async (user) => {
    if (user) {
      dispatch({
        type: USER.EMAIL_VERIFY,
        payload: user.emailVerified,
      });
      dispatch({
        type: USER.LOGIN,
        payload: { user },
      });
      dispatch(getUserProfile(user.uid));
    } else {
      dispatch({ type: USER.SIGNOUT });
    }
  });
  return Promise.resolve();
};

export const getUserMetaData = (user) => (dispatch) => {
  let sD = {
    uid: user.uid,
    username: user.username,
    email: user.email,
  };
  dispatch(getUserSaveTheme(user));
  dispatch(getFriendsRequestList(user.docId));
  dispatch(getFriendsList(user.docId));
  dispatch(getRealTimeMessages(user));
  dispatch(getUserRelatedGroupsNotRealTime(sD));
};

export const loginUser = (info) => {
  let authUser;
  return function (dispatch) {
    dispatch({
      type: USER.LOGIN_REQUEST,
    });
    auth
      .signInWithEmailAndPassword(info.email, info.password)
      .then(async (userCredential) => {
        authUser = await userCredential.user;
        dispatch({
          type: USER.LOGIN_REQUEST_SUCCESS,
        });
        dispatch({
          type: USER.EMAIL_VERIFY,
          payload: authUser.emailVerified,
        });
        dispatch({
          type: USER.LOGIN,
          payload: authUser,
        });
      })
      .then(() => getUserProfile(authUser.uid))
      .catch((error) => {
        dispatch(onLoginError(error));
      });
  };
};

export const onLoginError = (error) => {
  return {
    type: USER.LOGIN_ERROR,
    payload: error,
  };
};

const SignUpSetUserProfile = (data) => {
  const ref = db.collection("users").doc();
  data.docId = ref.id;
  return ref
    .set(data)
    .then(() => {
      console.log("successfully write user profile");
    })
    .catch((err) => {
      console.log("error in writing user profile", err);
    });
};

export const getUserProfile = (uid) => (dispatch) => {
  let user = null;
  const ref = db.collection("users").where("uid", "==", uid);
  return ref
    .get()
    .then((docs) => {
      docs.forEach((doc) => {
        user = doc.data();
        dispatch({
          type: USER.SETPROFILEDATA,
          payload: doc.data(),
        });
      });
    })
    .then(() => {
      dispatch(changeFetchingState(true));
    })
    .then(() => {
      history.push("/");
    })
    .then(() => {
      dispatch(getUserMetaData(user));
    })
    .catch((err) => {
      console.log("Get user data error", err);
    });
};

export const SignUp = (info) => {
  let data = {
    email: info.email,
    username: info.username,
    created: new Date(),
    phone: info.phone,
    theme: "light",
  };
  let createdUser;
  return (dispatch) => {
    auth
      .createUserWithEmailAndPassword(info.email, info.password)
      .then(async (userCredential) => {
        createdUser = await userCredential.user;
        console.log("Created User uid::", createdUser.uid);
        data.uid = createdUser.uid;
        dispatch({
          type: USER.REGISTER,
          payload: createdUser,
        });
      })
      .then(() => SignUpSetUserProfile(data))
      .then(() => {
        window.location.reload();
        history.push("/login");
      })
      .catch((error) => {
        console.log("Register Error::", error);
      });
  };
};

export const UpdateUserProfile = (info) => {
  var user = fb.auth().currentUser;
  user
    .updateProfile({
      displayName: "Jane Q. User",
      photoURL: "https://example.com/jane-q-user/profile.jpg",
    })
    .then(function () {
      // Update successful.
    })
    .catch(function (error) {
      // An error happened.
    });
};

export const SignOut = () => {
  return (dispatch) => {
    auth
      .signOut()
      .then(() => {
        console.log("SignOut successfully");
        dispatch({
          type: USER.SIGNOUT,
        });
      })
      .catch((err) => {
        console.log("SignOut Error", err);
      });
  };
};

export const editUserProfile = (data, user) => (dispatch) => {
  const ref = db.collection("users").doc(user.docId);
  return ref
    .update(data)
    .then(() => {
      console.log("update successfully");
      data.uid = user.uid;
      data.username = user.username;
      data.docId = user.docId;
      dispatch(editUserProfileSucdess(data));
    })
    .catch((err) => {
      console.log("Error in Updating User Profile:", err);
    });
};

export const sendEmailVerificationLink = () => {
  let user = fb.auth().currentUser;
  console.log("current user:", user);
  user
    .sendEmailVerification()
    .then(() => {
      console.log("successfully send email");
      SignOut();
      history.push("/login");
    })
    .catch((err) => {
      console.log("error in send email", err);
    });
};


export const changeUserPassword = (password) => (dispatch) => {
  var user = fb.auth().currentUser;
  console.log("Current User Is:", user);
  return user
    .updatePassword(password)
    .then(() => {
      console.log("Successfully Update Password");
    })
    .catch((err) => {
      SignOut();
      history.push("/login");
      dispatch(onLoginError(err));
      console.log("Error in update password:", err);
    });
};

export const changeFetchingState = (state) => {
  return {
    type: USER.DATA_FETCHING_CHANGE,
    payload: state,
  };
};

export const loginButtonLoading = (state) => {
  console.log("SET BTN:LOading:", state);
  return {
    type: USER.LOGIN_BTN_LOADING,
    payload: state,
  };
};

export const editUserProfileSucdess = (data) => {
  return {
    type: USER.EDIT_PROFILE,
    payload: data,
  };
};
