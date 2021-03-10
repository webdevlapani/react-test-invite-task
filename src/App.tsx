import 'antd/dist/antd.css';
import React, { FC } from 'react';
import Invite from './components/Invite';
import store from './store/store';
import { Provider } from 'react-redux';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BASEURL;

const App: FC = () => (
  <Provider store={store}>
    <Invite />
  </Provider>
);
export default App;
