import produce from "immer";

const initialState = {
  users: {},
  status: "idle",
};

export default function userReducer(state = initialState, actions) {
  switch (actions.type) {
    case "REQUEST_USER_INFO": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVE_USER_INFO": {
      return produce(state, (draftState) => {
        if (!draftState.users) {
          draftState.users = {};
        }
        draftState.users = actions.user.users;
        draftState.status = "idle";
      });
    }
    case "ADD_USER_INFO": {
      return produce(state, (draftState) => {
        if (actions.user) {
          draftState.user = actions.user.user;
        }
      });
    }
    default: {
      return state;
    }
  }
}
