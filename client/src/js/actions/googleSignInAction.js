import firebase from 'firebase';
import config from '../vendors/vendors.js';

export const googleSignIn = () => {
  firebase.initializeApp(config);
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      // const token = result.credential.accessToken;
      const user = result.user;
      if (user) {
        firebase.auth().onAuthStateChanged(() => {
          this.props.history.push('/broadcastboard');
        });
      }
      // console.log(token);
      // console.log(user.username);
    });
};
