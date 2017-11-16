
/**
 * @description describes a function that checks for invalid
 * body request object
 * @param { object } request
 * @return { object } validationError messages for the particular identified
 */
const validate = (request) => {
  if (request.hasOwnProperty('body')) {
    for (const key in request.body) {
      switch (key) {
        case 'email':
          request.check('email', 'User email is required').notEmpty();
          request.check('email', 'Email is badly formatted').isEmail();
          break;

        case 'password':
          request.check('password', 'Password is required').notEmpty();
          request.check('password',
            'Password must be at least 6 characters and contain number')
            .isLength({ min: 6 })
            .matches(/\d/);
          break;

        case 'confirmPassword':
          request.check('confirmPassword', 'Please confirm the password')
          .notEmpty();
          break;

        case 'username':
          request.check('username', 'Username is required')
            .notEmpty().matches(/\w/);
          request.check('username', 'Username should be at least 2 characters')
            .isLength(2, 50);
          break;

        case 'group':
          request.check('group', 'Group name is required').notEmpty();
          request.check('group', 'Group name should be at least 3 characters')
            .isLength(3, 50);
          break;

        case 'message':
          request.check('message', 'Message is required').notEmpty();
          break;

        case 'memberId':
          request.check('memberId', 'MemberId is required').notEmpty();
          break;

        case 'groupId':
          request.check('groupId', 'GroupId is required').notEmpty();
          break;

        case 'priority':
          request.check('priority', 'Message priority is required').notEmpty();
          break;

        case 'phoneNumber':
          request.check('phoneNumber', 'Incorect phoneNumber').isLength(11);
          request.check('phoneNumber', 'PhoneNumber is required').notEmpty();
          request.check('phoneNumber', 'Enter a valid phone Number')
            .isMobilePhone('en-NG');
          break;
        default:
      }
    }
  }
  return request.validationErrors();
};

/**
 * @description This validates all request inputs
 * @param { object } req
 * @param { object } res
 * @param { function } next
 * @function  validateRequestBody
 * @return { object } return object containing validation error message
 */
const validateRequestBody = (req, res, next) => {
  const errors = validate(req);
  if (errors) {
    const message = errors[0].msg;
    res.status(400).send({ error: { code: message } });
  } else {
    next();
  }
};
export default validateRequestBody;
