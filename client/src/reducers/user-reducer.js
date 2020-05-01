import produce from "immer";

const initialState = {
  user: {},
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
        if (!draftState.user) {
          draftState.user = {};
        }
        draftState.user = actions.user.id;
      });
    }
    default: {
      return state;
    }
  }
}
