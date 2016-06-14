import * as types from '../constants/ActionTypes';

/**
 *  Reducer related to Chat
 */
export default (state = [], action) => {
  switch (action.type) {
    case types.MESSAGE_RECEIVED:
    return [
      ...state,
      action.message
    ];
    case types.MESSAGE_SENT:
    return [
      ...state
    ];
    default:
    return state;
  }
};
