import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import App from './containers/App';
import Store from './store';
import './assets/sass/index.scss';

render(<Provider store={Store}><App /></Provider>, document.getElementById('root'));
