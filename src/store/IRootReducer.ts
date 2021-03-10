/**
 * Register root reducer state here
 */
import { IInvitesState } from './Invites/invitesReducer';
import { IUsersState } from './Users/userReducer';

export interface IRootReducerState {
  /**
   * Current user Reducer state
   */
  users: IUsersState;
  /**
   * Invites Reducer Reducer state
   */
  invites: IInvitesState;
}
