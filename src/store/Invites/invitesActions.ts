import {
  ADD_INVITES_REQUEST,
  ADD_INVITES_REQUEST_FAILURE,
  ADD_INVITES_REQUEST_SUCCESS,
  DELETE_INVITES_REQUEST,
  DELETE_INVITES_REQUEST_FAILURE,
  DELETE_INVITES_REQUEST_SUCCESS,
  GET_INVITES_REQUEST,
  GET_INVITES_REQUEST_FAILURE,
  GET_INVITES_REQUEST_SUCCESS
} from './invitesTypes';
import { IAction } from '../IAction';
import { IInvites } from './IInvites';

/**
 * call on get Invites request
 */
export const getInvitesRequest = (): IAction => {
  return {
    type: GET_INVITES_REQUEST,
  };
};

/**
 * call on get Invites success
 */
export const getInvitesSuccess = (invites: IInvites[]): IAction => {
  return {
    type: GET_INVITES_REQUEST_SUCCESS,
    payload: invites,
  };
};

/**
 * call on get Invites failure
 */
export const getInvitesFailure = (error: string): IAction => {
  return {
    type: GET_INVITES_REQUEST_FAILURE,
    payload: error,
  };
};

/**
 * call on add Invites request
 */
export const addInvitesRequest = (): IAction => {
  return {
    type: ADD_INVITES_REQUEST,
  };
};

/**
 * call on add Invites success
 */
export const addInvitesSuccess = (invites: IInvites[]): IAction => {
  return {
    type: ADD_INVITES_REQUEST_SUCCESS,
    payload: invites,
  };
};

/**
 * call on add Invites failure
 */
export const addInvitesFailure = (error: string): IAction => {
  return {
    type: ADD_INVITES_REQUEST_FAILURE,
    payload: error,
  };
};

/**
 * call on delete Invites request
 */
export const deleteInvitesRequest = (): IAction => {
  return {
    type: DELETE_INVITES_REQUEST,
  };
};

/**
 * call on delete Invites success
 */
export const deleteInvitesSuccess = (id: number): IAction => {
  return {
    type: DELETE_INVITES_REQUEST_SUCCESS,
    payload: id,
  };
};

/**
 * call on delete Invites failure
 */
export const deleteInvitesFailure = (error: string): IAction => {
  return {
    type: DELETE_INVITES_REQUEST_FAILURE,
    payload: error,
  };
};
