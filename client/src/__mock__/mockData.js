export default {

  // groupAction mockData
  groupName: {
    group: 'andelauuuuu'
  },

  groupActionError: {
    response: {
      data: {
        error: 'Group already exists'
      }
    }
  },

  // MemeberAction mockData
  groupId: '-KwWEZj5RSYLAtP2TbDv',

  addMemberResponse: {
    response: 'Add member successfully'
  },

  memberDetails: {
    groupId: '-KwZyowDPR6PAQmGIRcw',
    memberId: 'SUL5pAUsQmV3FxNQXIb9hXFbI8h2'
  },

  memberActionError: {
    response: {
      data: {
        error: 'User`s already a member'
      }
    }
  },

  // MessageAction mockData
  messageActionError: {
    response: {
      data: {
        message: 'No message found'
      }
    }
  },
  messageDetails: {
    message: 'Hello, User Sign in',
    priority: 'normal',
    groupId: '-KvIvb4PMw3w2pr9196U'
  },

  // ResetPasswordAction mockData
  resetResponse: {
    message: 'Password reset email sent successfully!'
  },

  mail: {
    email: 'quduskunle@gmail.com'
  },

  resetPasswordError: {
    response: {
      data: {
        error: {
          message: 'Invalid email address'
        }
      }
    }
  },
  email: {
    email: 'qudusgmail.com'
  },

  // signInAction mockData
  user: {
    email: 'quduskunle@gmail.com',
    password: 'Ka123@'
  },

  signInActionError: {
    response: {
      data: {
        error: {
          message: 'Invalid signin details'
        }
      }
    }
  },

  // GoogleSignInAction mockData
  googleSignInError: {
    response: 'invalid sign in details'
  },

  // signOutAction mock Data
  signOutResponse: {
    message: 'User`s signed-out successfully'
  },

  // signUpAction mock Data
  signUpUser: {
    email: 'quduskunle@gmail.com',
    password: 'Ka123@',
    confirmPassword: 'Ka123@',
    phoneNumber: '07031187445',
    userName: 'kunle'
  },
  signUpActionError: {
    response: {
      data: {
        error: {
          code: 'Password does not match'
        }
      }
    }
  },

  // GroupStore MockData
  groupStoreGroups: {
    message: 'Registration successful and verification' +
    ' email sent to your email'
  },

  // SignIn Store mock Data
  signInStorePasswordReset: {
    message: 'Password reset email sent successfully!'
  },

  // SignInStore Google SignIn mockData
  signInStoreGoogleSignIn: {
    message: 'user`s signed in succesfully'
  },

  // SignUpStore mockData
  signUpMockData: {
    message: 'Registration successful and verification' +
    ' email sent to your email'
  },

};
