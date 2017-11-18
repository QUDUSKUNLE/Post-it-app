[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://choosealicense.com/licenses/mit/)
[![Code Climate](https://codeclimate.com/github/QUDUSKUNLE/Post-it-app/badges/gpa.svg)](https://codeclimate.com/github/QUDUSKUNLE/Post-it-app)
[![Maintainability](https://api.codeclimate.com/v1/badges/ff93509487d4388c88cf/maintainability)](https://codeclimate.com/github/QUDUSKUNLE/Post-it-app/maintainability)
[![Build Status](https://travis-ci.org/QUDUSKUNLE/Post-it-app.svg?branch=feedback-implementation)](https://travis-ci.org/QUDUSKUNLE/Post-it-app)
[![Coverage Status](https://coveralls.io/repos/github/QUDUSKUNLE/Post-it-app/badge.svg?branch=feedback-implementation)](https://coveralls.io/github/QUDUSKUNLE/Post-it-app?branch=feedback-implementation)

# PostIt-app
  PostIt is a simple application that allows friends come together and create group(s) for notifications.
  This way one person can send notifications to everyone in the group by sending message once. The application allows people create accounts, create groups and add registered users to groups, and then send messages to members of a group whenever there is need.

  A live demo of the app can access on Heroku via <b><a href="https://heroku-postitapp.herokuapp.com/">PostIt-app</a></b>

# PostIt-app API.
  PostIt-app provides a restful API for users to sign up, sign in, create groups and as well add members to group.
  PostIt-app API is built with <a href="https://firebase.google.com/">Firebase</a>, <a href="https://expressjs.com/">Express</a>, <a href="https://facebook.github.io/react/">React</a> and <a href="https://nodejs.org/">Node.js</a>


 # Application Features
  <b>.</b> Users can sign up

  <b>.</b> Users can sign in

  <b>.</b> Users can sign in with Google Account

  <b>.</b> Users can reset password

  <b>.</b> Signed in users can create group

  <b>.</b> Users can add other registered users to groups

  <b>.</b> Users can send message to groups they belong to

  <b>.</b> Users would receive notification base on message priority ```normal```, ```urgent``` and ```critical```

  <b>.</b> Users can see members of their groups
  
  <b>.</b> Users can sign out

## API Documentation
  The Link to API documentation can be found here <a href="https://app.apiary.io/postitapp/editor">API Doumentation</a>

# Getting Started
  Kindly follow the steps below to setup a local development environment.
  + ```Clone``` this repository from a terminal ```git clone  https://github.com/QUDUSKUNLE/Post-it-app```

  + ```cd``` into the project directory

  + Install project dependencies ```npm install```

  + Create an account on ```firebase``` and set up the app and get account details from ```firebase```

  + Create ```.env``` file and set up the variables in ```.env-sample``` to your specified database connection gotten from ```firebase```

   + ```npm start```

   + Go to ```http://localhost:8080/```


  ## How to run Test

+ ```git clone https://github.com/QUDUSKUNLE/Post-it-app```

+ and run ```npm test``` for ```server test``` and
* ```npm run client_test``` for ```client test```

## Limitations
+ Users cannot edit profile

+ Users can add any registered users without users prior knowledge

+ Users cannot leave a group

+ Users cannot delete message sent

+ Users that signed in with Google would not receive SMS notification

## Author
+ MIT © [Qudus YEKEEN (ABU MUHSINAH)](https://github.com/QUDUSKUNLE)


## Contribution
If you wish to contribute to this Open source project, kindly fork the respository and raise a Pull Request against ```development branch```

 # MIT License
 
 Copyright © 2017
 
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
