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
  }
};
