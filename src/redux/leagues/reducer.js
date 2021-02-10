import types from "../types";

const leagues = (
  state = { loading: true, data: null, error: null },
  action
) => {
  switch (action.type) {
    case types.GET_LEAGUES_START:
      return { ...state, loading: true };
    case types.GET_LEAGUES_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case types.GET_LEAGUES_ERROR:
      return { loading: false, data: null, error: action.payload };

    default:
      return state;
  }
};

export default leagues;
