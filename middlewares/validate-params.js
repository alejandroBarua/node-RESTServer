const { ObjectId } = require('mongoose').Types;


const isCategoryIdValid = async(req, res, next) => {

	const { category } = req.query;

	if(category && !ObjectId.isValid(category)) return res.status(401).json({msg: 'invalid category'});
	
	next();
}

module.exports = isCategoryIdValid;