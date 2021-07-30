const { Router} = require('express');
const router = Router();

const {check} = require('express-validator');

const { isValidations } = require('../middlewares/validations');
const validateJWT = require('../middlewares/validate-jwt');
const { isUserRole } = require('../middlewares/user-roles');
const isUserState = require('../middlewares/user-state');

const { 
	isNotEmailDB,
	isUserIdDB,
	isValidRole,
} = require('../helpers/validate-user');

const {	
	getUsers,
	postUser,
	putUser,
	deleteUser
} = require('../controllers/users')


router.get('/', getUsers);

router.post('/',[
	check('name', 'the name is required').not().isEmpty(),
	check('password', 'the password must be more than 6 characters').isLength({min: 6}),
	check('email', 'invalid email').isEmail(),
	check('email').custom(isNotEmailDB),
	//check('role', 'invalid role').isIn(['ADMIN_ROLE', 'USER_ROLE']), 
	check('role').custom(isValidRole),
	isValidations
] , postUser);

router.put('/:id', [
	validateJWT,
	isUserState,
	check('id', 'invalid id').isMongoId(),
	check('name', 'the name is required').not().isEmpty(),
	check('id').custom(isUserIdDB),
	check('role').custom(isValidRole),
	isValidations
] , putUser);

router.delete('/:id', [
	validateJWT,
	isUserState,
	//isAdminRole,
	isUserRole('ADMIN_ROLE'),
	check('id').isMongoId(),
	check('id').custom(isUserIdDB),
	isValidations
], deleteUser);

module.exports = router;