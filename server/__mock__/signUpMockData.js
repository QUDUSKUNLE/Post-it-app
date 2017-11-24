import faker from 'faker';

export default
{
  // signUp MockData
  inCorrectPassword: {
    email: faker.internet.email(),
    password: 'kawthar',
    confirmPassword: 'kawthar',
    username: faker.name.findName(),
    phoneNumber: '08052327990'
  },

  withoutEmail: {
    email: '',
    password: 'kawthar',
    confirmPassword: 'kawthar',
    username: faker.name.findName(),
    phoneNumber: '08052327990'
  },

  withoutUsername: {
    email: faker.internet.email(),
    password: 'kawthar2',
    confirmPassword: 'kawthar',
    username: '',
    phoneNumber: '08052327990'
  },

  withUsernameLessThanTwo: {
    email: faker.internet.email(),
    password: 'kawthar1',
    confirmPassword: 'kawthar1',
    username: 'a',
    phoneNumber: '08052327990'
  },

  withWrongConfirmPassword: {
    email: faker.internet.email(),
    password: 'kawthar1',
    confirmPassword: 'kawthar',
    username: faker.name.findName(),
    phoneNumber: '08052327990'
  },

  inCorrectPhoneNumber: {
    email: faker.internet.email(),
    password: 'kawthar1',
    confirmPassword: 'kawthar1',
    username: faker.name.findName(),
    phoneNumber: '0809289312'
  },

  invalidPhoneNumber: {
    email: faker.internet.email(),
    password: 'kawthar1',
    confirmPassword: 'kawthar1',
    username: faker.name.findName(),
    phoneNumber: '0809289312123'
  },

  badFormatEmail: {
    email: 'qudus.com',
    password: 'kawthar@',
    confirmPassword: 'kawthar@',
    username: faker.name.findName(),
    phoneNumber: '08092893120'
  },

  emailAndPassword: {
    email: faker.internet.email(),
    password: 'Ka123@',
    confirmPassword: 'Ka123@',
    username: faker.name.findName(),
    phoneNumber: '08092893120'
  },

  alreadySignupUser: {
    email: 'kawthar@gmail.com',
    password: 'kawthar1',
    confirmPassword: 'kawthar1',
    username: 'Joke',
    phoneNumber: '08092893120'
  },

  alreadyUsedUserName: {
    email: 'kawthar@gmail.com',
    password: 'kawthar1',
    confirmPassword: 'kawthar1',
    username: 'everette murphy',
    phoneNumber: '08092893120'
  }
};
