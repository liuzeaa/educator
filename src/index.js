import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.less';
import configureStore from './store';
import Page from './Page'
import { Provider }from 'react-redux';
const store = configureStore();

ReactDOM.render(<Provider store={store}><Page/></Provider>, document.getElementById('root'));