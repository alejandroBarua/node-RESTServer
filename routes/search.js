const { Router } = require('express');
const router = Router();

const { isValidations } = require('../middlewares/validations');
const isCategoryIdValid = require('../middlewares/validate-params');

const { 
	search,

} = require('../controllers/search');


router.get('/',[
	isCategoryIdValid,
	isValidations
], search);

module.exports = router;