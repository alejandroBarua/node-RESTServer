const { Router } = require('express');
const router = Router();

const { Category } = require('../models');

const { check } = require('express-validator');

const { isValidations } = require('../middlewares/validations');
const validateJWT = require('../middlewares/validate-jwt');
const { isAdminRole } = require('../middlewares/user');
const isProductOfUser = require('../middlewares/user-product');

const { isProductState } = require('../helpers/validate-product');

const { 
	createProduct,
	getProducts,
	getProduct,
	putProduct,
	deleteProduct

} = require('../controllers/products');



router.get('/', getProducts);

// public
router.get('/:id',[
	check('id', 'invalid id').isMongoId(),
	check('id').custom(isProductState),
	isValidations
], getProduct);

router.post('/', [
	validateJWT,
	check('name', 'the name is required').not().isEmpty(),
	check('category', 'the category is required').not().isEmpty(),
	check('category', 'invalid id').isMongoId(),
	check('category').custom( async(id) => {
		const { state } = await  Category.findById(id);
		if(!state) throw new Error(`the category ${id} not exists`);
	}),
	isValidations
], createProduct);

router.put('/:id', [
	validateJWT,
	isProductOfUser,
	check('id', 'invalid id').isMongoId(),
	check('id').custom(isProductState),
	check('category').custom( async(id='') => {
		if(id){
			const { state } = await  Category.findById(id);
			if(!state) throw new Error(`the category ${id} not exists`);
		}
	}),
	isValidations
], putProduct);

router.delete('/:id',[
	validateJWT,
	isAdminRole,
	check('id', 'invalid id').isMongoId(),
	check('id').custom(isProductState),
	isValidations
], deleteProduct);



module.exports = router;
