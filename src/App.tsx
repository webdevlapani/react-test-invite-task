import 'antd/dist/antd.css';
import axios from 'axios';
import React, { FC } from 'react';
import { Provider } from 'react-redux';
import Invite from './components/Invite';
import store from './store/store';

axios.defaults.baseURL = process.env.REACT_APP_BASEURL;

const App: FC = () => (
  <Provider store={store}>
    <Invite />
  </Provider>
);
export default App;
