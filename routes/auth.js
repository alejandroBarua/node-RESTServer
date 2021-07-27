const { Router } = require('express');
const router = Router();

const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validate } = require('../middlewares/validate');



router.post('/login', [
	check('email', 'invalid email').isEmail(),
	check('password', 'the password is required').not().isEmpty(),
	validate
], login);

module.exports = router;
