import axios, { AxiosResponse } from 'axios';
import {
  getUsersFailure,
  getUsersRequest,
  getUsersSuccess
} from './userActions';


/**
 * service for current user.
 */
export const getUsers = (searchTerm: string) => {
  return (dispatch) => {
    dispatch(getUsersRequest());
    axios
      .get(`users/${searchTerm}`)
      .then((response: AxiosResponse) => {
        dispatch(getUsersSuccess(response.data.data));
      })
      .catch((error) => {
        dispatch(getUsersFailure(error.response.data.error));
      });
  };
};
