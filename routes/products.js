const { Router } = require('express');
const router = Router();

const { check } = require('express-validator');

const { isValidations } = require('../middlewares/validations');
const validateJWT = require('../middlewares/validate-jwt');

const { 
	isCategoryState,
	findCategoryByName
} = require('../helpers/validate-category');

const isUserState = require('../middlewares/user-state');
const { isAdminRole, isUserRole } = require('../middlewares/user-roles');


const { 
	createProduct,
	getProducts,

} = require('../controllers/products');



router.get('/', getProducts);

router.post('/', [
	validateJWT,
	isUserState,
	check('name', 'the name is required').not().isEmpty(),
	check('category', 'the category is required').not().isEmpty(),
	check('name').custom(findCategoryByName),
	isValidations
], createProduct);



module.exports = router;
