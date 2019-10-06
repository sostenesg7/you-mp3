import * as ACTION_TYPES from './../actions/youtube';
import Immutable from 'seamless-immutable';
const initialState = Immutable({});

export default (state = initialState, action) => {
  const { type, payload, error } = action;

  switch (type) {
    case ACTION_TYPES.GET_VIDEO_INFORMATION_REQUESTED:
      return {
        ...initialState,
        isRequesting: true
      };
    case ACTION_TYPES.GET_VIDEO_INFORMATION_SUCCESS:
      return {
        ...initialState,
        isSuccess: true,
        ...payload.data
      };
    case ACTION_TYPES.GET_VIDEO_INFORMATION_ERROR:
      return {
        ...initialState,
        error: error.data || error.response.data.msg
      };

    default:
      return state;
  }
};
