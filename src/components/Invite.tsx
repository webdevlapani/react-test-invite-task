import React, { useEffect, useState } from 'react';
import { AutoComplete, Button, Card, Col, Row, Tag, Input, Modal, Spin } from 'antd';
import styled from 'styled-components';
import { DeleteOutlined, MessageFilled } from '@ant-design/icons';
import { getUsers } from '../store/Users/userServices';
import { useDispatch, useSelector } from 'react-redux';
import { addInvites, deleteInvites, getInvites } from '../store/Invites/invitesServices';
import { IRootReducerState } from '../store/IRootReducer';
import { useDebounce } from '../hooks/useDebounce';
import { IUser } from '../store/Users/IUser';
import { IInvites } from '../store/Invites/IInvites';
import moment from 'moment';

const StyledRow = styled(Row)`
  margin: 30px;
  padding: 50px;
`;

const StyledCol = styled(Col)``;

const StyledCard = styled(Card)`
  border-radius: 15px;
  box-shadow: 0 0 7px 1px #00000024;
  .ant-card-body {
    padding: 0;
  }
`;

const Header = styled.div`
  border-bottom: 1px solid #dbdbdb;
  padding: 15px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderTitle = styled.div`
  margin: 0;
  color: #489f9b;
  font-weight: 800;
  font-size: 18px;
`;

const HeaderSearchArea = styled.div`
  display: flex;
  align-items: center;
`;
const StyledSearch = styled(AutoComplete)`
  .ant-input-group {
    display: flex;
    align-items: center;
  }
  .ant-input {
    border-radius: 40px !important;
    padding: 3px 60px 3px 15px;
    &:hover + span > button,
    &:focus + span > button {
      z-index: 1075;
    }
  }
  .ant-input-group-addon {
    left: -40px !important;
    background: none;
    button {
      background: none;
      box-shadow: none;
      border: 0;
    }
  }
`;

const InviteButton = styled(Button)`
  background: #ecac40;
  border-radius: 40px;
  border: 0;
  color: #fff;
  text-transform: uppercase;
  padding: 6px 20px;
  font-weight: 700;
  margin-left: 10px;
  :hover,
  :focus {
    background: #ecac40;
    border-radius: 40px;
    border: 0;
    color: #fff;
    text-transform: uppercase;
    padding: 6px 20px;
    font-weight: 700;
    margin-left: 10px;
  }
`;

const InvitedUserSection = styled.div`
  padding: 15px 40px;
  > div {
    border-bottom: 1px solid #e7e7e7;
    padding: 15px 0;
  }
`;

const InvitedUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    color: #989898;
    margin: 0;
    .ant-tag {
      background-color: #63b5d1;
      border-radius: 40px;
      margin-left: 10px;
      padding: 0 15px;
      color: white;
      border: 0;
    }
  }
  .anticon {
    color: #499f9b;
    font-size: 16px;
    margin-left: 20px;
  }
`;
const StartSession = styled.span`
  font-size: 12px;
  text-transform: uppercase;
  color: #499f9b;
`;
const StyledDeleteOutlined = styled(DeleteOutlined)`
  cursor: pointer;
`;

const Invite = () => {
  const dispatch = useDispatch();

  const users = useSelector((state: IRootReducerState) => state.users);
  const invites = useSelector((state: IRootReducerState) => state.invites);

  const [currentInvites, setCurrentInvites] = useState<IInvites>();
  const [value, setValue] = useState('');
  const [optionValue, setOptionValue] = useState('');

  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);

  const [visibleInviteConfirmation, setVisibleInviteConfirmation] = useState(false);
  const [loadingInviteConfirmation, setLoadingInviteConfirmation] = useState(false);

  const [visibleDeleteInviteConfirmation, setDeleteVisibleInviteConfirmation] = useState(false);
  const [loadingDeleteInviteConfirmation, setLoadingDeleteInviteConfirmation] = useState(false);

  useDebounce(
    () => {
      if (value) dispatch(getUsers(value));
    },
    1000,
    [value]
  );

  useEffect(() => {
    if (users.users.length) {
      const data = users.users.map((user: IUser) => ({ value: user._id, label: user.name }));
      setOptions(data);
    } else setOptions([{ value: '', label: 'No user Found' }]);
  }, [users]);

  const onSelect = (data: string, option) => {
    setValue(option.label);
  };

  const handleOkInviteConfirmation = () => {
    if (optionValue) {
      setLoadingInviteConfirmation(true);
      dispatch(
        addInvites(optionValue, () => {
          dispatch(getInvites());
          setValue('');
          setVisibleInviteConfirmation(false);
          setLoadingInviteConfirmation(false);
        })
      );
    }
  };

  const handleCancelInviteConfirmation = () => {
    setVisibleInviteConfirmation(false);
  };

  const handleOkDeleteInviteConfirmation = () => {
    if (currentInvites) {
      setLoadingDeleteInviteConfirmation(true);
      dispatch(
        deleteInvites(currentInvites._id, () => {
          dispatch(getInvites());
          setDeleteVisibleInviteConfirmation(false);
          setLoadingDeleteInviteConfirmation(false);
        })
      );
    }
  };

  const handleCancelDeleteInviteConfirmation = () => {
    setDeleteVisibleInviteConfirmation(false);
  };

  const onChange = (data: string) => {
    setOptionValue(data);
    setValue(data);
  };

  const handleDeleteInvite = (invites: IInvites) => {
    setCurrentInvites(invites);
    setDeleteVisibleInviteConfirmation(true);
  };

  useEffect(() => {
    dispatch(getInvites());
  }, [dispatch]);

  return (
    <>
      <StyledRow>
        <StyledCol span={18} offset={3}>
          <StyledCard>
            <Header>
              <HeaderTitle> {invites.invites.length} Attendees in Waiting Room</HeaderTitle>
              <HeaderSearchArea>
                <StyledSearch
                  value={value}
                  options={options}
                  onSelect={onSelect}
                  onChange={onChange}
                >
                  <Input.Search
                    size="large"
                    placeholder="Start Typing ...."
                    loading={users.loading}
                  />
                </StyledSearch>
                <InviteButton onClick={() => setVisibleInviteConfirmation(true)}>
                  Invite Staff
                </InviteButton>
              </HeaderSearchArea>
            </Header>
            <InvitedUserSection>
              {invites.loading ? (
                <Spin />
              ) : (
                invites.invites.map((invite: IInvites) => (
                  <InvitedUser key={invite._id}>
                    <p>
                      {invite.user.name}
                      <Tag>{moment(invite.createdAt).fromNow()}</Tag>
                    </p>
                    <div>
                      <StartSession>start session</StartSession>
                      <MessageFilled />
                      <StyledDeleteOutlined onClick={() => handleDeleteInvite(invite)} />
                    </div>
                  </InvitedUser>
                ))
              )}
            </InvitedUserSection>
          </StyledCard>
        </StyledCol>
      </StyledRow>
      <Modal
        title="Add Invite Confirmation"
        visible={visibleInviteConfirmation}
        onOk={handleOkInviteConfirmation}
        confirmLoading={loadingInviteConfirmation}
        onCancel={handleCancelInviteConfirmation}
      >
        <p>Are you sure to invite?</p>
      </Modal>

      <Modal
        title="Delete Invite Confirmation"
        visible={visibleDeleteInviteConfirmation}
        onOk={handleOkDeleteInviteConfirmation}
        confirmLoading={loadingDeleteInviteConfirmation}
        onCancel={handleCancelDeleteInviteConfirmation}
      >
        <p>Are you sure to delete this invite?</p>
      </Modal>
    </>
  );
};

export default Invite;
