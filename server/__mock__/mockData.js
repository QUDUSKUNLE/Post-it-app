import faker from 'faker';

export default
{
  // signUp MockData
  signUpWithNonValidatedPassword: {
    email: faker.internet.email(),
    password: 'kawthar',
    confirmPassword: 'kawthar',
    username: faker.name.findName(),
    phoneNumber: '08052327990'
  },

  signUpWithoutEmail: {
    email: '',
    password: 'kawthar',
    confirmPassword: 'kawthar',
    username: faker.name.findName(),
    phoneNumber: '08052327990'
  },

  signUpWithoutUsername: {
    email: faker.internet.email(),
    password: 'kawthar2',
    confirmPassword: 'kawthar',
    username: '',
    phoneNumber: '08052327990'
  },

  signUpWithUsernameLessThanTwo: {
    email: faker.internet.email(),
    password: 'kawthar1',
    confirmPassword: 'kawthar1',
    username: 'a',
    phoneNumber: '08052327990'
  },

  signUpWithWrongConfirmPassword: {
    email: faker.internet.email(),
    password: 'kawthar1',
    confirmPassword: 'kawthar',
    username: faker.name.findName(),
    phoneNumber: '08052327990'
  },

  signUpWithWrongPhoneNumber: {
    email: faker.internet.email(),
    password: 'kawthar1',
    confirmPassword: 'kawthar1',
    username: faker.name.findName(),
    phoneNumber: '0809289312'
  },

  signUpWithInvalidPhoneNumber: {
    email: faker.internet.email(),
    password: 'kawthar1',
    confirmPassword: 'kawthar1',
    username: faker.name.findName(),
    phoneNumber: '0809289312123'
  },

  signUpWithBadFormatEmail: {
    email: 'qudus.com',
    password: 'kawthar@',
    confirmPassword: 'kawthar@',
    username: faker.name.findName(),
    phoneNumber: '08092893120'
  },

  signUpWithEmailAndPassword: {
    email: faker.internet.email(),
    password: 'Ka123@',
    confirmPassword: 'Ka123@',
    username: faker.name.findName(),
    phoneNumber: '08092893120'
  },

  signUpWithAlreadySignupUser: {
    email: 'kawthar@gmail.com',
    password: 'kawthar1',
    confirmPassword: 'kawthar1',
    username: 'Joke',
    phoneNumber: '08092893120'
  },

  signUpWithAlreadyUsedUserName: {
    email: 'kawthar@gmail.com',
    password: 'kawthar1',
    confirmPassword: 'kawthar1',
    username: 'everette murphy',
    phoneNumber: '08092893120'
  },

  // signIn MockData
  signInWithWrongPassword: {
    email: 'Kemi@gmail.com',
    password: 'Ka123@#'
  },

  signInWithoutEmail: {
    email: '',
    password: 'kawthar@'
  },

  signInWithBadFormatEmail: {
    email: 'kunle.com',
    password: 'kawthar@'
  },

  signInWithoutPassword: {
    email: 'kunle@gmail.com',
    password: ''
  },

  signInWithWrongDetails: {
    email: 'kawthath@gmail.com',
    password: 'kawthar1'
  },

  signInWithCorrectDetails: {
    email: 'kunle@gmail.com',
    password: 'Ka123@',
  },

  // resetPassword MockData
  resetPasswordWithoutEmail: {
    email: ''
  },

  resetPasswordWithBadFormatEmail: {
    email: 'kunle@.com'
  },

  resetPasswordWithCorrectEmail: {
    email: 'sasil@gmail.com'
  },

  resetPasswordWithNotFoundEmail: {
    email: 'user@gmail.com'
  },

  // Send Message to Groups MockData
  sendMessageWithOutMessage: {
    message: '',
    priority: 'normal'
  },

  sendMessageWithOutPriority: {
    message: 'Hello wale',
    priority: ''
  },

  // Create Groups MockData
  creatGroupWithOutGroupName: {
    group: ''
  },

  createGroupWithgroupNameLessThanThree: {
    group: 'ab'
  },

  createGroupWithCorrectDetails: {
    group: faker.name.findName()
  },

  createGroupWithAlreadyExistGroupName: {
    group: 'andela'
  },

  // AddMember to Groups MockData
  addMemberToGroupWithOutMemberId: {
    memberId: ''
  },

  addAlreadyExistingUser: {
    memberId: 'HoPNmtMqNgbKX6zKiH7yKIPazYx2'
  }
};
