/* import * as ACTION_TYPES from '../actions';
import Immutable from 'seamless-immutable';
const initialState = Immutable({
  list: [],
  readed: [],
  count: 0
});

export default (state = initialState, action) => {
  const { type, payload, error } = action;

  switch (type) {
    case ACTION_TYPES.OPEN_NOTIFICATION: {
      const readed = [...state.readed];
      readed[payload.id] = true;

      return {
        list: state.list,
        readed,
        count: state.count - 1
      };
    }

    case ACTION_TYPES.PUSH_NOTIFICATION_OPENED: {
      const openList = [payload.notification, ...state.list];
      return {
        list: openList,
        readed: [true, ...state.readed],
        count: state.count - 1
      };
    }

    case ACTION_TYPES.PUSH_NOTIFICATION_RECEIVED: {
      const recList = [payload.notification, ...state.list];
      return {
        list: recList,
        readed: [false, ...state.readed],
        count: state.count + 1
      };
    }

    case ACTION_TYPES.CLEAR_NOTIFICATIONS:
      return initialState;

    default:
      return state;
  }
};
 */
