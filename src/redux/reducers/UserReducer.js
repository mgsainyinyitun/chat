import { USER } from "../actions/Types";

const INITIAL_STATE = {
  auth: null,
  isEmailVerified: null,
  user: {
    data: null,
  },
  errors: null,
  fetching: true,
  loading: false,
};

export const LoadingState = (
  state = { loginLoading: false, signupLoading: false },
  action
) => {
  switch (action.type) {
    case USER.LOGIN_REQUEST:
      return {
        loginLoading: true,
      };
    case USER.LOGIN_ERROR:
      return {
        loginLoading: false,
      };
    case USER.LOGIN_REQUEST_SUCCESS:
      return {
        loginLoading: false,
      };
    
    case USER.REGISTER_REQUEST:
      return{
        signupLoading:true,
      }
    case USER.REGISTER_REQUEST_FAIL:
      return{
        signupLoading:false,
      }
    case USER.REGISTER:
      return{
        signupLoading:false,
      }
    default:
      return state;
  }
};

export const UserAuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER.LOGIN_REQUEST:
      return {
        ...state,
        errors: null,
      };
    case USER.LOGIN:
      return {
        ...state,
        auth: action.payload,
        errors: null,
      };
    case USER.REGISTER:
      return {
        ...state,
        auth: action.payload,
      };
    case USER.SIGNOUT:
      return {};
    case USER.SETPROFILEDATA:
      return {
        ...state,
        user: {
          data: action.payload,
        },
      };

    case USER.REGISTER_REQUEST_FAIL:
      return{
        ...state,
        errors:action.payload,
      }
    case USER.LOGIN_ERROR:
      return {
        ...state,
        errors: action.payload,
      };
    case USER.DATA_FETCHING_CHANGE:
      return {
        ...state,
        fetching: action.payload,
      };
    case USER.LOGIN_BTN_LOADING:
      return {
        ...state,
        btnLoading: action.payload,
      };
    case USER.EDIT_PROFILE:
      return {
        ...state,
        User: {
          data: action.payload,
        },
      };
    case USER.EMAIL_VERIFY:
      return {
        ...state,
        loading: false,
        isEmailVerified: action.payload,
      };
    default:
      return state;
  }
};
