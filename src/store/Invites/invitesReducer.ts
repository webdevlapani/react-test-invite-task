import { IAction } from '../IAction';
import {
  GET_INVITES_REQUEST, GET_INVITES_REQUEST_FAILURE, GET_INVITES_REQUEST_SUCCESS

} from './invitesTypes';
import { IInvites } from './IInvites';

export interface IInvitesState {
  loading: boolean;
  invites: IInvites[];
  error: string;
}

const initialState: IInvitesState = {
  loading: false,
  invites: [],
  error: '',
};

/**
 * bootcamp reducer
 * @param state
 * @param action
 */
const invitesReducer = (state = initialState, action: IAction): IInvitesState => {
  switch (action.type) {
    case GET_INVITES_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case GET_INVITES_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        invites: action.payload,
        error: '',
      };
    case GET_INVITES_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        invites: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default invitesReducer;
