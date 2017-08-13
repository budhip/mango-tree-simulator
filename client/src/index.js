import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBKtVIN2MX24cshL1z86K3cbH4raqv22RU",
  authDomain: "mango-tree-3c126.firebaseapp.com",
  databaseURL: "https://mango-tree-3c126.firebaseio.com",
  projectId: "mango-tree-3c126",
  storageBucket: "mango-tree-3c126.appspot.com",
  messagingSenderId: "684277572061"
};
firebase.initializeApp(config);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
registerServiceWorker();
