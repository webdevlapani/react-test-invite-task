import { IUser } from '../Users/IUser';

export interface IInvites {
  _id: string;
  isDelete: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  user: IUser;
}
