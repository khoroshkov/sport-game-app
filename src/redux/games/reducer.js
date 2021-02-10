import types from "../types";

const games = (
  state = { loading: true, data: null, current: null, error: null },
  action
) => {
  switch (action.type) {
    case types.GET_GAMES_START:
      return { ...state, loading: true };
    case types.GET_GAMES_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        current: null,
        error: null,
      };
    case types.GET_GAMES_ERROR:
      return {
        loading: false,
        data: null,
        current: null,
        error: action.payload,
      };
    case types.GET_CURRENT_GAME:
      return { ...state, current: action.payload };

    default:
      return state;
  }
};

export default games;
