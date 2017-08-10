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

  signInUser(user) {
    axios.post('/user/signin', {
      email: user.email,
      password: user.password
    })
    .then((res) => res)
    .catch((err) => err);
  }
};

export default AppAPI;
