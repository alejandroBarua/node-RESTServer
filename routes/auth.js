const { Router } = require('express');
const router = Router();

const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validate } = require('../middlewares/validate');



router.post('/login', [
	check('email', 'invalid email').isEmail(),
	check('password', 'the password is required').not().isEmpty(),
	validate
], login);

router.post('/google', [
	check('id_token', 'the password is required').not().isEmpty(),
	validate
], googleSignIn);

module.exports = router;
