import produce from "immer";

const initialState = {
  rooms: {},
  status: "idle",
};

export default function roomsReducer(state = initialState, actions) {
  switch (actions.type) {
    case "REQUEST_ROOM_INFO": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVE_ROOM_INFO": {
      return produce(state, (draftState) => {
        if (!draftState.rooms) {
          draftState.rooms = {};
        }
        draftState.rooms = actions.room.rooms;
        draftState.status = "idle";
      });
    }
    case "ADD_ROOM_INFO": {
      return produce(state, (draftState) => {
        if (actions.rooms) {
          draftState.rooms = actions.rooms.room;
        }
      });
    }
    default: {
      return state;
    }
  }
}
