import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { HashRouter as Router, Route } from 'react-router-dom'
import routes from './components/routes';

ReactDOM.render(
	<Router routes={routes} history={browserHistory} />,
	document.getElementById('app')
);
