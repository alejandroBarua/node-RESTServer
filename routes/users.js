const { Router} = require('express');
const router = Router();

const {check} = require('express-validator');

const { validate } = require('../middlewares/validate');
const validateJWT = require('../middlewares/validate-jwt');
const validateState = require('../middlewares/validate-state');
const { isAdminRole, isRole } = require('../middlewares/validate-roles');


const { 
	isValidRole, 
	isValidEmail,
	isValidId,
} = require('../helpers/validations');

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
	check('email').custom(isValidEmail),
	//check('role', 'invalid role').isIn(['ADMIN_ROLE', 'USER_ROLE']), 
	check('role').custom(isValidRole),
	validate
] , postUser);

router.put('/:id', [
	check('id').isMongoId(),
	check('id').custom(isValidId),
	check('role').custom(isValidRole),
	validate
] , putUser);

router.delete('/:id', [
	validateJWT,
	validateState,
	//isAdminRole,
	isRole('ADMIN_ROLE'),
	check('id').isMongoId(),
	check('id').custom(isValidId),
	validate
], deleteUser);

module.exports = router;