import types from "../types";

const leagues = (state = { loading: true, data: null }, action) => {
  switch (action.type) {
    case types.GET_LEAGUES_START:
      return { ...state, loading: true };
    case types.GET_LEAGUES_SUCCESS:
      return { loading: false, data: action.payload };
    case types.GET_LEAGUES_ERROR:
      return { loading: false, data: null };

    default:
      return state;
  }
};

export default leagues;
