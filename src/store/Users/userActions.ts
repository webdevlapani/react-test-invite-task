import { GET_USERS_FAILURE, GET_USERS_REQUEST, GET_USERS_SUCCESS } from './userTypes';
import { IAction } from '../IAction';
import { IUser } from './IUser';

/**
 * call on users request.
 */
export const getUsersRequest = (): IAction => {
  return {
    type: GET_USERS_REQUEST,
  };
};

/**
 * call on users success.
 */
export const getUsersSuccess = (users: IUser[]): IAction => {
  return {
    type: GET_USERS_SUCCESS,
    payload: users,
  };
};

/**
 * call on users failure.
 */
export const getUsersFailure = (error: string): IAction => {
  return {
    type: GET_USERS_FAILURE,
    payload: error,
  };
};
