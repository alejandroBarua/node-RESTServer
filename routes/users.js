const { Router} = require('express');
const router = Router();

const {check} = require('express-validator');
const { isValidations } = require('../middlewares/validations');

const { isNotEmailDB } = require('../helpers/validate-user');

const validateJWT = require('../middlewares/validate-jwt');
const { isAdminRole, isSameUserId, isUserId } = require('../middlewares/user');

const {	
	getUsers,
	getUser,
	postUser,
	putUser,
	deleteUser
} = require('../controllers/users');


router.get('/',[
	validateJWT,
	isAdminRole,
], getUsers);

// id, email
router.get('/:info',[
	validateJWT,
	isAdminRole,
], getUser);

router.post('/',[
	check('email', 'invalid email').isEmail(),
	check('email', 'the email is required').not().isEmpty(),
	check('email').custom(isNotEmailDB),
	check('password', 'the password must be more than 6 characters').isLength({min: 6}),
	check('password', 'the password is required').not().isEmpty(),
	check('name', 'the name is required').not().isEmpty(),
	//check('role', 'invalid role').isIn(['ADMIN_ROLE', 'USER_ROLE']), 
	isValidations
] , postUser);

// name, state
router.put('/:id', [
	validateJWT,
	isSameUserId,
] , putUser);


// admin role
router.delete('/:id', [
	validateJWT,
	isAdminRole,
	isUserId
], deleteUser);

module.exports = router;