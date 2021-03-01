import types from "../types";

const teams = (state = { loading: true, data: null, error: null }, action) => {
  switch (action.type) {
    case types.GET_TEAMS_START:
      return { ...state, loading: true };
    case types.GET_TEAMS_SUCCESS:
      return { loading: false, data: action.payload };
    case types.GET_TEAMS_ERROR:
      return { loading: false, data: null, error: action.payload };

    default:
      return state;
  }
};

export default teams;
