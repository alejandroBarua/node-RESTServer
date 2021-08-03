const { Router } = require('express');
const router = Router();

const { check } = require('express-validator');

const { isValidations } = require('../middlewares/validations');
const validateJWT = require('../middlewares/validate-jwt');
const { isAdminRole } = require('../middlewares/user');

const { isCategoryState, isNotCategoryDB } = require('../helpers/validate-category');

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

// admin role
router.post('/', [
	validateJWT,
	isAdminRole,
	check('name', 'the name is required').not().isEmpty(),
	check('name').custom(isNotCategoryDB),
	isValidations
], createCategory);

// admin role
router.put('/:id',[
	validateJWT,
	isAdminRole,
	check('id', 'invalid id').isMongoId(),
	check('name').custom(isNotCategoryDB),
	isValidations
], putCategory);

// admin role
router.delete('/:id',[
	validateJWT,
	isAdminRole,
	check('id', 'invalid id').isMongoId(),
	check('id').custom(isCategoryState),
	isValidations
], deleteCategory);


module.exports = router;
