import produce from "immer";

const initialState = {
  room: {},
  status: "idle",
};

export default function roomReducer(state = initialState, actions) {
  switch (actions.type) {
    case "REQUEST_ROOM_INFO": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVE_ROOM_INFO": {
      return produce(state, (draftState) => {
        if (!draftState.room) {
          draftState.room = {};
        }
        draftState.room = actions.room.id;
      });
    }
    case "ADD_ROOM_INFO": {
      return produce(state, (draftState) => {
        if (!draftState.rooms) {
          draftState.rooms = [];
        }
        draftState.rooms.push("room");
      });
    }
    default: {
      return state;
    }
  }
}
