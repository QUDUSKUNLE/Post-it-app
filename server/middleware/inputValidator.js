import Helper from '../helper/helper.js';

/**
 * @description: class Validates contains methods
 * that validates requests inputs for each route
 *
 * @class Validate
 */
export default class Validate {

  /**
   * @description: This validates signUpInputs
   *
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Function} next callback function
   *
   * @return {Object} response contains validation status
   */
  static signUpInputs(req, res, next) {
    req.check('username', 'Username is required').notEmpty().matches(/\w/);
    req.check('email', 'User email is required').notEmpty();
    req.check('email', 'Email is badly formatted').isEmail();
    req.check('password', 'Password is required').notEmpty();
    req.check('phoneNumber', 'Incorect phoneNumber').isLength(11);
    req.check('phoneNumber', 'Enter a valid phone Number')
      .isMobilePhone('en-NG');
    req.check('confirmPassword', 'Please confirm the password').notEmpty();
    req.check('username', 'username should be at least 2 characters')
      .isLength(2, 50);
    const errors = req.validationErrors();
    if (errors) {
      const message = errors[0].msg;
      res.status(400).send({ error: { code: message
      } });
    } else if (req.body.password !== req.body.confirmPassword) {
      res.status(403).send({ error: { code:
        'Password does not match'
      } });
    } else if (!Helper.validatePassword(req.body.password)) {
      res.status(403).send({ error: { code:
        'Password should be at least 6 characters with a speacial character'
      } });
    } else {
      next();
    }
  }

  /**
   * @description: This validates signInInputs
   *
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Function} next callback function
   *
   * @return {Object} response contains validation status
   */
  static signInInputs(req, res, next) {
    req.check('email', 'User email is required').notEmpty();
    req.check('email', 'Email is badly formatted').isEmail();
    req.check('password', 'Password is required').notEmpty();
    const errors = req.validationErrors();
    if (errors) {
      const message = errors[0].msg;
      res.status(400).send({ error: { code: message } });
    } else {
      next();
    }
  }

  /**
   * @description: This validates passwordResetInputs
   *
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Function} next callback function
   *
   * @return {Object} response contains validation status
   */
  static passwordResetInputs(req, res, next) {
    req.check('email', 'User email is required').notEmpty();
    req.check('email', 'Email is badly formatted').isEmail();
    const errors = req.validationErrors();
    if (errors) {
      const message = errors[0].msg;
      res.status(400).send({ error: { code: message } });
    } else {
      next();
    }
  }

  /**
   * @description: This validates createGroupInputs
   *
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Function} next callback function
   *
   * @return {Object} response contains validation status
   */
  static createGroupInputs(req, res, next) {
    req.check('group', 'Group name is required').notEmpty();
    req.check('group',
      'Group name should contain only words').notEmpty().matches(/\w/);
    req.check('group', 'Group name should be at least 3 characters')
      .isLength(3, 50);
    const errors = req.validationErrors();
    if (errors) {
      const message = errors[0].msg;
      res.status(400).send({ error: { code: message } });
    } else {
      next();
    }
  }

  /**
   * @description: This validates addMemberInputs
   *
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Function} next callback function
   *
   * @return {Object} response contains validation status
   */
  static addMemberInputs(req, res, next) {
    req.check('memberId', 'MemberId is required').notEmpty();
    const errors = req.validationErrors();
    if (errors) {
      const message = errors[0].msg;
      res.status(400).send({ error: { code: message } });
    } else {
      next();
    }
  }

  /**
   * @description: This validates sendMessageInputs
   *
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Function} next callback function
   *
   * @return {Object} response contains validation status
   */
  static sendMessageInputs(req, res, next) {
    req.check('message', 'Message is required').notEmpty();
    req.check('priority', 'Message priority is required').notEmpty();
    const errors = req.validationErrors();
    if (errors) {
      const message = errors[0].msg;
      res.status(400).send({ error: { code: message } });
    } else {
      next();
    }
  }
}
