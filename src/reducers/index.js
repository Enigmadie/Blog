import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const channels = handleActions({
  [actions.addChannel](state, { payload: { channel } }) {
    return [state.channels, channel];
  },
}, []);

const messages = handleActions({
  [actions.addMessageSuccess](state, { payload: { message } }) {
    return [...state, message];
  },
}, []);

export default combineReducers({ channels, messages });
