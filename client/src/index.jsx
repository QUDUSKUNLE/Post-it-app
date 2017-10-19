import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, browserHistory, Route, Switch,
  Redirect } from 'react-router-dom';
import UserApp from './components/UserApp';
import UserSignIn from './components/UserSignIn';
import UserCreateGroup from './components/UserCreateGroup';
import UserBroadCastBoard from './components/UserBroadCastBoard';
import UserAddMember from './components/UserAddMember';
import UserResetPassword from './components/UserResetPassword';
import NotFound from './components/NotFound';
import './index.scss';


const store = createStore(
  (state = {}) => state,
  applyMiddleware(thunk)
);


// const userLoggedIn = () => {
//   const loggedIn = JSON.parse(localStorage.getItem('userIn'));
//   let user;
//   if (loggedIn) {
//     user = true;
//   } else {
//     user = false;
//   }
//   return user;
// };

// console.log(userLoggedIn());


// ReactDOM.render(
//   <Provider store={store}>
//     <Router history={browserHistory}>
//       <Switch>
//         <Route
//           exact path="/" component={ UserApp }/>
//         <Route
//           path="/signin" component={UserSignIn} />
//         <Route
//           path="/passwordreset" component={UserResetPassword}/>
//         <Route path="/member"
//           component={() => (userLoggedIn() ? ({ UserAddMember }) : (<Redirect to="/signin"/>))}/>
//         <Route path="/broadcastboard"
//           component={() => (userLoggedIn() ? ({ UserBroadCastBoard }) : (<Redirect to="/signin"/>))}/>
//         <Route path="/group"
//           component={() => (userLoggedIn() ? ({ UserCreateGroup }) : (<Redirect to="/signin"/>))}/>
//         <Route path="*" component={NotFound} />
//       </Switch>
//     </Router>
//   </Provider>, document.getElementById('app')
// );

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Switch>
        <Route
          exact path="/" component={ UserApp }/>
        <Route
          path="/signin" component={UserSignIn} />
        <Route
          path="/passwordreset" component={UserResetPassword}/>
        <Route path="/member"
          component={UserAddMember}/>
        <Route path="/broadcastboard"
          component={UserBroadCastBoard}/>
        <Route path="/group"
          component={UserCreateGroup}/>
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  </Provider>, document.getElementById('app')
);
