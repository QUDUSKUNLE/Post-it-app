import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
// import { HashRouter as Router, Route } from 'react-router-dom'
// import routes from '../src/components/routes'
// import { Provider } from 'react-redux'
// import thunk from "redux-thunk";
// import { createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import rootReducer from '../src/reducers';
import App from './App'

// const store = createStore(
// 	rootReducer,
// 	composeWithDevTools(
// 		applyMiddleware(thunk)
// 	)
// );

ReactDOM.render(
	<App />
		
	, document.getElementById('app')
);
