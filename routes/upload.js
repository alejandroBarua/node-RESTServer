const { Router } = require('express');
const router = Router();

const { 
	isCollection, // id, collection, document
	isValidFiles // type, count

} = require('../middlewares');

const { 
	upload,
	
} = require('../controllers/upload');


router.post('/:collection/:id', [
	isCollection,
	isValidFiles,	
], upload);


module.exports = router;
