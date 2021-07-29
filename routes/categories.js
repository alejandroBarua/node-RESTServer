const { Router } = require('express');
const router = Router();

const { check } = require('express-validator');

const { isValidations } = require('../middlewares/validations');
const validateJWT = require('../middlewares/validate-jwt');

const { 
	isCategoryState,
	isNotCategoryDB
} = require('../helpers/validate-category');

const isUserState = require('../middlewares/user-state');
const { isAdminRole, isUserRole } = require('../middlewares/user-roles');


const { 
	createCategory, 
	getCategories, 
	getCategory,
	putCategory,
	deleteCategory

} = require('../controllers/categories');


// public

router.get('/', getCategories);

// public
router.get('/:id',[
	check('id', 'invalid id').isMongoId(),
	check('id').custom(isCategoryState),
	isValidations
], getCategory);

// valid token
// user state
router.post('/', [
	validateJWT,
	isUserState,
	check('name', 'the name is required').not().isEmpty(),
	check('name').custom(isNotCategoryDB),
	isValidations
], createCategory);

// valid token
// user state
router.put('/:id',[
	validateJWT,
	isUserState,
	check('id', 'invalid id').isMongoId(),
	check('id').custom(isCategoryState),
	check('name', 'the name is required').not().isEmpty(),
	check('name').custom(isNotCategoryDB),
	isValidations
], putCategory);

// admin role
// user state
router.delete('/:id',[
	validateJWT,
	isUserState,
	isUserRole('ADMIN_ROLE'),
	check('id', 'invalid id').isMongoId(),
	check('id').custom(isCategoryState),
	isValidations
], deleteCategory);


module.exports = router;
