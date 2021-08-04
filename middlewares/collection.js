const { User, Product } = require('../models');
const { ObjectId } = require('mongoose').Types;

const isCollection = async(req, res, next) => {

	const { collection, id } = req.params;

	if(!ObjectId.isValid(id)) return res.status(401).json({ msg: 'invalid id' });

	const query = { _id: id, state: true }

	switch (collection) {
		case 'user':
			const user = await User.findOne(query);
			if(!user) return res.status(401).json({ msg: `the ${collection} does not exist` });
			break;
		case 'product':
			const product = await Product.findOne(query);
			if(!product) return res.status(401).json({ msg: `the ${collection} does not exist` });
			break;
		default:
			return res.status(401).json({ msg: 'invalid collection' });
			break;
	}

	next();
}

const authCollection =  async(req, res, next) => {

	const { collection, id } = req.params;
	const user = req.user;
	
	switch (collection) {
		case 'user':
			if(!(user.id == id)) return res.status(401).json({ msg: `invalid user` });
			break;
		case 'product':
			const product = await Product.findById(id);
			if(!(user.id == product.user)) return res.status(401).json({ msg: `invalid user` });
			break;
	}

	next();
}

module.exports = {
	isCollection,
	authCollection

};


