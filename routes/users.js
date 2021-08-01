const { Router} = require('express');
const router = Router();

const {check} = require('express-validator');

const { isValidations } = require('../middlewares/validations');
const validateJWT = require('../middlewares/validate-jwt');
const { isAdminRole } = require('../middlewares/user-roles');
const isUserState = require('../middlewares/user-state');
const isSameUserId = require('../middlewares/user-id');

const { 
	isNotEmailDB,
	isUserIdDB,
} = require('../helpers/validate-user');

const {	
	getUsers,
	getUser,
	postUser,
	putUser,
	deleteUser
} = require('../controllers/users');

const {User} = require('../models')

router.get('/',[
	validateJWT,
	isUserState,
	isAdminRole,
	isValidations
], getUsers);

// id
// email
router.get('/:info',[
	validateJWT,
	isUserState,
	isAdminRole,
	isValidations
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

// name
// state
router.put('/:id', [
	validateJWT,
	isUserState,
	isSameUserId,
	check('name', 'the name is required').not().isEmpty(),
	isValidations
] , putUser);


// admin role
router.delete('/:id', [
	validateJWT,
	isUserState,
	isAdminRole,
	check('id', 'invalid id').isMongoId(),
	//check('id').custom(isUserIdDB),
	check('id').custom(async(id) => {
		const {state} = await User.findById(id);
		if(!state) throw new Error(`the ID ${id} not exists`);
	}),
	isValidations
], deleteUser);

module.exports = router;