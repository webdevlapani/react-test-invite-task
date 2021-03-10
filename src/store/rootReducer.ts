/**
 * It is root for store reducer
 */
import { combineReducers } from 'redux';
import { IRootReducerState } from './IRootReducer';
import usersReducer from './Users/userReducer';
import invitesReducer from './Invites/invitesReducer';

const rootReducer = combineReducers<IRootReducerState>({
  users: usersReducer,
  invites: invitesReducer,
});

export default rootReducer;
