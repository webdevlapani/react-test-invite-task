import { IAction } from '../IAction';
import {
  GET_USERS_FAILURE,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
} from './userTypes';
import { IUser } from './IUser';

export interface IUsersState {
  loading: boolean;
  users: IUser[];
  error: string;
}

const initialState: IUsersState = {
  loading: false,
  users: [],
  error: '',
};

/**
 * reducer for current user.
 * @param state
 * @param action
 */
const userReducer = (state = initialState, action: IAction): IUsersState => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        users: initialState.users,
        error: '',
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: '',
      };
    case GET_USERS_FAILURE:
      return {
        loading: false,
        users: initialState.users,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
