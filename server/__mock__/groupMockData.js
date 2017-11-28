import faker from 'faker';

export default {
  // Create Groups MockData
  withOutGroupName: {
    group: ''
  },

  groupNameLessThanThree: {
    group: 'ab'
  },

  withCorrectDetails: {
    group: faker.name.findName()
  },

  withAlreadyExistGroupName: {
    group: 'andela'
  },
  getEmailPhoneNumbers: [
    { email: 'joe@gmail.com', phoneNumber: '08076567701' },
    { email: 'Kol@gmail.com', phoneNumber: '08092893120' },
    { email: 'kawtharadejoke@gmail.com', phoneNumber: '08092893120' },
    { email: 'quduskunle@gmail.com', phoneNumber: '08052327998' },
    { email: 'koe@gmail.com', phoneNumber: '08052327998' },
    { email: 'qudus.yekeen@andela.com', phoneNumber: '08092893120' }
  ],
};
