const initialState = {
  isLoggingIn: false,
  isLoggingOut: false,
  isVerifying: false,
  loginError: false,
  logoutError: false,
  isAuthenticated: false,
  user: {},
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_REQUEST": {
      return {
        ...state,
        isLoggingIn: true,
        loginError: false,
      };
    }
    case "LOGIN_SUCCES": {
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: true,
        user: action.user,
      };
    }
    case "LOGIN_FAILURE": {
      return {
        ...state,
        isLoggingin: false,
        isAuthenticated: false,
        loginError: true,
      };
    }
    case "LOGOUT_REQUEST": {
      return {
        ...state,
        isLoggingOut: true,
        logoutError: false,
      };
    }
    case "LOGOUT_SUCCESS": {
      return {
        ...state,
        isLoggingOut: false,
        isAuthenticated: false,
        user: {},
      };
    }
    case "LOGOUT_FAILURE": {
      return {
        ...state,
        isLoggingOut: false,
        logoutError: true,
      };
    }
    case "VERIFY_REQUEST": {
      return {
        ...state,
        isVerifying: true,
      };
    }
    case "VERIFY_SUCCESS": {
      return {
        ...state,
        isVerifying: false,
      };
    }
    default:
      return state;
  }
}
