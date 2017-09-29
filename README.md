
[![Licences MIT](https://choosealicense.com/licenses/mit/)]
[![Build Status](https://travis-ci.org/QUDUSKUNLE/Post-it-app.svg?branch=development)](https://travis-ci.org/QUDUSKUNLE/Post-it-app)
[![Coverage Status](https://coveralls.io/repos/github/QUDUSKUNLE/Post-it-app/badge.svg?branch=development)](https://coveralls.io/github/QUDUSKUNLE/Post-it-app?branch=development)


# PostIt-app
  PostIt is a simple application that allows friends come together and create group(s) for notifications.
  This way one person can send notifications to everyone in the group by sending message once. The application allows people create accounts, create groups and add registered users to groups, and then send messages to members of a group whenever there is need.

  A live demo of the app can access on Heroku via <b><a href="https://heroku-postitapp.herokuapp.com/">PostIt-app</a></b>

# PostIt-app API.
  PostIt-app provides a restful API for users to sign up, sign in, create groups and as well add members to group.
  PostIt-app API is built with <a href="https://firebase.google.com/">Firebase</a>, <a href="https://expressjs.com/">Express</a>, <a href="https://facebook.github.io/react/">React</a> and <a href="https://nodejs.org/">Node.js</a>


 # Application Features
  <b>.</b> Users can Sign up

  <b>.</b> Users can Sign in

  <b>.</b> Users can Sign in with Google

  <b>.</b> Users can reset password

  <b>.</b> Signed in users can create group

  <b>.</b> Users can add other registered users to groups

  <b>.</b> Users can send message to groups they belong to

  <b>.</b> Users can receive notification base on message priority

  <b>.</b> Users can see members of their groups
  
  <b>.</b> Users can Sign out


# Getting Started
  Kindly follow the steps below to setup a local development environment.
  1. <b>Clone</b> this repository from a terminal <b>git clone https://github.com/QUDUSKUNLE/Post-it-app.</b>

  2. Move into the project directory

  3. Install project dependencies <b>npm install</b>

  4. Create an account on firebase and set up the app

  5. Create an .env file and set the variables in .env-sample to your specified database connection

  6. <b>npm start</b>

  7. Go to <b>http://localhost:8080/</b>

# Limitations
1. Users cannot edit profile

2. Users can add any registered users without users prior knowledge

3. Users cannot leave a group

4. Users cannot delete message sent

# FAQ

# Author
  . Qudus YEKEEN

 # MIT License
 
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
