import React from 'react';
import App from "./components/App";
import ReactDom from 'react-dom';
import 'antd/dist/antd.css'; 
import {BrowserRouter as Router} from 'react-router-dom';
import history from "./history";

ReactDom.render(
<Router history={history}>
	<App />
</Router>,

document.getElementById('root'))






