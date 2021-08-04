const { isCollection, authCollection } = require('./collection');
const isValidFiles = require('./files');
const validateJWT = require('./validate-jwt');
const isImageId = require('./image');

module.exports = {
	isCollection,
	authCollection,
	isValidFiles,
	validateJWT,
	isImageId
}