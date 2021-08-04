const { Router } = require('express');
const router = Router();

const { 
	validateJWT,
	authCollection,
	isCollection, // id, collection, document
	isValidFiles, // type, count
	isImageId

} = require('../middlewares');

const { 
	upload,
	deleteFiles
} = require('../controllers/upload');


router.post('/:collection/:id', [
	validateJWT,
	isCollection,
	authCollection,
	isValidFiles,	
], upload);

router.delete('/:collection/:id', [
	validateJWT,
	isCollection,
	authCollection,
	isImageId
], deleteFiles);


module.exports = router;
