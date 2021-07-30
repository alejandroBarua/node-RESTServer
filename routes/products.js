const { Router } = require('express');
const router = Router();

const { Category } = require('../models');

const { check } = require('express-validator');

const { isValidations } = require('../middlewares/validations');
const validateJWT = require('../middlewares/validate-jwt');
const { isUserRole } = require('../middlewares/user-roles');
const isUserState = require('../middlewares/user-state');

const { isNotProductDB, isProductState } = require('../helpers/validate-product');

const { 
	createProduct,
	getProducts,
	getProduct,
	putProduct,
	deleteProduct

} = require('../controllers/products');



router.get('/', getProducts);

router.get('/:id',[
	check('id', 'invalid id').isMongoId(),
	check('id').custom(isProductState),
	isValidations
], getProduct);

router.post('/', [
	validateJWT,
	isUserState,
	check('name', 'the name is required').not().isEmpty(),
	check('category', 'the category is required').not().isEmpty(),
	check('name').custom(isNotProductDB),
	check('category').custom( async(name) => {
		const category = await  Category.findOne({name: name.toUpperCase(), state: true});
		if(!category) throw new Error(`the category ${name} not exists`);
	}),
	isValidations
], createProduct);

router.put('/:id', [
	validateJWT,
	isUserState,
	check('id', 'invalid id').isMongoId(),
	check('id').custom(isProductState),
	check('name', 'the name is required').not().isEmpty(),
	check('category', 'the category is required').not().isEmpty(),
	check('name').custom(isNotProductDB),
	check('category').custom( async(name) => {
		const category = await  Category.findOne({name: name.toUpperCase(), state: true});
		if(!category) throw new Error(`the category ${name} not exists`);
	}),
	isValidations
], putProduct);

router.delete('/:id',[
	validateJWT,
	isUserState,
	isUserRole('ADMIN_ROLE'),
	check('id', 'invalid id').isMongoId(),
	check('id').custom(isProductState),
	isValidations
], deleteProduct);



module.exports = router;
