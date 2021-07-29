const { Router } = require('express');
const router = Router();

const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { isValidations } = require('../middlewares/validations');



router.post('/login', [
	check('email', 'invalid email').isEmail(),
	check('password', 'the password is required').not().isEmpty(),
	isValidations
], login);

router.post('/google', [
	check('id_token', 'the password is required').not().isEmpty(),
	isValidations
], googleSignIn);

module.exports = router;
