[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://choosealicense.com/licenses/mit/)
[![Code Climate](https://codeclimate.com/github/QUDUSKUNLE/Post-it-app/badges/gpa.svg)](https://codeclimate.com/github/QUDUSKUNLE/Post-it-app)
[![Issue Count](https://codeclimate.com/github/QUDUSKUNLE/Post-it-app/badges/issue_count.svg)](https://codeclimate.com/github/QUDUSKUNLE/Post-it-app)
[![Build Status](https://travis-ci.org/QUDUSKUNLE/Post-it-app.svg?branch=feedback-implementation)](https://travis-ci.org/QUDUSKUNLE/Post-it-app)
[![Coverage Status](https://coveralls.io/repos/github/QUDUSKUNLE/Post-it-app/badge.svg?branch=feedback-implementation)](https://coveralls.io/github/QUDUSKUNLE/Post-it-app?branch=feedback-implementation)

# PostIt-app
  PostIt is a simple application that allows friends come together and create group(s) for notifications.
  This way one person can send notifications to everyone in the group by sending message once. The application allows people create accounts, create groups and add registered users to groups, and then send messages to members of a group whenever there is need.

  A live demo of the app can access on Heroku via <b><a href="https://heroku-postitapp.herokuapp.com/">PostIt-app</a></b>

## PostIt-app API.
  PostIt-app provides a restful API for users to sign up, sign in, create groups and as well add members to group.
  PostIt-app API is built with <a href="https://firebase.google.com/">Firebase</a>, <a href="https://expressjs.com/">Express</a>, <a href="https://facebook.github.io/react/">React</a> and <a href="https://nodejs.org/">Node.js</a>


 ## Application Features
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
  The Link to API documentation can be found here <a href="https://postitapp.docs.apiary.io/#reference">API Doumentation</a>

## Getting Started
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
+ [Qudus YEKEEN (ABU MUHSINAH)](https://github.com/QUDUSKUNLE)

## FAQ
#### Is PostIt a free app?
Yes, it's free.

#### Is PostIt an open source?
Yes, It's an open source project, and we encourage anyone who wish to contribute to do so.

## Contribution
If you wish to contribute to this Open source project, kindly fork the respository and raise a Pull Request against ```development branch```.
For every pull request raised, kindly adhere to this best practises <a href="https://github.com/airbnb/javascript">link</a> to conform with the standard to which this project codebase is written.

+ For more clarifications, do contant via this email ```qudus.yekeen@andela.com```.

 ## License
 
This software is licensed under the MIT License. See the <a href="https://github.com/QUDUSKUNLE/Post-it-app/blob/feedback-implementation/LICENSE">LICENSE</a> file in the top distribution directory for the full license text.
