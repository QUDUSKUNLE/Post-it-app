
[![Build Status](https://travis-ci.org/QUDUSKUNLE/Post-it-app.svg?branch=development)](https://travis-ci.org/QUDUSKUNLE/Post-it-app)
[![Coverage Status](https://coveralls.io/repos/github/QUDUSKUNLE/Post-it-app/badge.svg?branch=server-test)](https://coveralls.io/github/QUDUSKUNLE/Post-it-app?branch=server-test)


# PostIt-app
  PostIt is a simple application that allows friends come together and create group(s) for notifications.
  This way one person can send notifications to everyone in the group by sending message once. The application allows people create accounts, create groups and add registered users to groups, and then send messages to members of a group whenever there is need.

  A live demo of the app can access on Heroku via <b><a href="https://heroku-postitapp.herokuapp.com/">PostIt-app</a></b>

# PostIt-app API.
  PostIt-app provides a restful API for users to sign up, sign in, create groups and as well add members to group.
  PostIt-app API is built with <a href="https://firebase.google.com/">Firebase</a>, <a href="https://expressjs.com/">Express</a>, <a href="https://facebook.github.io/react/">React</a> and <a href="https://nodejs.org/">Node.js</a>



# Dependencies
  
  The following dependencies are required by the app
  
  <b>. <a href="https://www.npmjs.com/package/axios">axios</a></b> - It's used to make GET/POST requests to APIs

  <b>. <a href="https://www.npmjs.com/package/babel-core">babel-core</a></b> - It compiles Ecmascript-6 to Ecmascript-5 in the app

  <b>. <a href="https://www.npmjs.com/package/babel-eslint">babel-eslint</a></b> - It helps to lint Syntax errors

  <b>. <a href="https://www.npmjs.com/package/babel-loader">babel-loader</a></b> - It transpiles Javascript codes

  <b>. <a href="https://coveralls.io/">Coveralls</a></b> - It displays test coverage

  <b>. <a href="https://coveralls.io/">Coveralls</a></b> - It displays test coverage

  <b>. <a href="https://www.npmjs.com/package/eslint">eslint</a></b> - This is a javascript syntax highlighter used to highligh syntax error during the development of this app

  <b>. <a href="https://www.npmjs.com/package/eslint-confi-airbnb">eslint-config-airbnb</a></b> - It contains eslint rules

  <b>. <a href="https://www.npmjs.com/package/firebase">firebase</a></b> - Firebase helps to authenticate and manage users.

  <b>. <a href="https://facebook.github.io/react/">react</a></b> - It helps the app to use React architecture
  
  <b>. <a href="https://www.npmjs.com/package/react-google-login">react-google-login </a></b> - Enables sign in with google

  <b>. <a href="https://www.npmjs.com/package/flux">flux</a></b> - It allows Unidirectional flow of data in the application

  <b>. <a href="https://www.npmjs.com/package/nyc">nyc</a></b> - For test coverage

  <b>. <a href="https://www.npmjs.com/package/webpack">webpack</a></b> - Used to bundle the app's js files

  <b>. <a href="https://www.npmjs.com/package/webpack-dev-middleware">webpack-dev-middleware</a></b> - It helps to serve files to the server

  <b>. <a href="https://www.npmjs.com/package/webpack-hot-middleware">webpack-hot-middleware</a></b> - Enables the browser to reload automatically when changes are made to the app


# Local installation
  Kindly follow the steps below to setup a local development environment.
  1. <b>Clone</b> this repository from a terminal <b>git clone https://github.com/QUDUSKUNLE/Post-it-app.</b>

  2. Move into the project directory

  3. Install project dependencies <b>npm install</b>

  4. Create an account on firebase and set up the app

  5. Create an .env file and set the variables in .env-sample to your specified database connection

  6. <b>npm start</b>

  7. Go to <b>http://localhost:8080/</b>
  
 
 
 MIT License
 
 Copyright (c) 2017
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
