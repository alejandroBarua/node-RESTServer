const { Product } = require('../models')

const isProductOfUser = async(req, res, next) => {

	const { id } = req.user;
	const { user } = await Product.findById(req.params.id);

	if(!(id == user._id)) return res.status(401).json({msg: 'invalid user'});
	
	next();
}

module.exports = isProductOfUser;