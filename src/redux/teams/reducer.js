import types from "../types";

const teams = (state = { loading: true, data: null }, action) => {
  switch (action.type) {
    case types.GET_TEAMS_START:
      return { ...state, loading: true };
    case types.GET_TEAMS_SUCCESS:
      return { loading: false, data: action.payload };
    case types.GET_TEAMS_ERROR:
      return { loading: false, data: null };

    default:
      return state;
  }
};

export default teams;
