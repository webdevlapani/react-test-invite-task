import axios, { AxiosResponse } from 'axios';
import {
  addInvitesFailure,
  addInvitesRequest,
  addInvitesSuccess, deleteInvitesFailure,
  deleteInvitesRequest,
  deleteInvitesSuccess,
  getInvitesFailure,
  getInvitesRequest,
  getInvitesSuccess,
} from './invitesActions';

/**
 * service for get invites
 */
export const getInvites = () => {
  return (dispatch) => {
    dispatch(getInvitesRequest());
    axios
      .get('invites')
      .then((response: AxiosResponse) => {
        dispatch(getInvitesSuccess(response.data.data));
      })
      .catch((error) => {
        dispatch(getInvitesFailure(error.response.data.error));
      });
  };
};

/**
 * service for add invites
 */
export const addInvites = (userId: string, callBack: () => void) => {
  return (dispatch) => {
    dispatch(addInvitesRequest());
    axios
      .post('invites', {userId})
      .then((response: AxiosResponse) => {
        dispatch(addInvitesSuccess(response.data));
        callBack();
      })
      .catch((error) => {
        dispatch(addInvitesFailure(error.response.data.error));
      });
  };
};

/**
 * service for delete invites
 */
export const deleteInvites = (id: string, callBack: () => void) => {
  return (dispatch) => {
    dispatch(deleteInvitesRequest());
    axios
      .delete(`invites/${id}`)
      .then((response: AxiosResponse) => {
        dispatch(deleteInvitesSuccess(response.data));
        callBack();
      })
      .catch((error) => {
        dispatch(deleteInvitesFailure(error.response.data.error));
      });
  };
};
