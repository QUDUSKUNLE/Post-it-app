import axios from 'axios';

const AppAPI = {
  signUpUser(user) {
    axios.post('/user/signup', {
      username: user.username,
      password: user.password,
      email: user.email
    })
    .then((res) => res)
    .catch((err) => err);
  },

  signInUser(email, password) {
    axios.post('/user/signin', {
      email,
      password
    })
    .then((res) => res)
    .catch((err) => err);
  }
};

export default AppAPI;
