import React from 'react';
import App from "./components/App";
import ReactDom from 'react-dom';
import 'antd/dist/antd.css'; 
import { Router } from 'react-router-dom';
import history from "./history";
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from './redux/reducers';

const store = createStore(reducers);

ReactDom.render(
		<Provider store={store}>
			<Router history={history}>
				<App />
			</Router>
		</Provider>
	,
document.getElementById('root'))






