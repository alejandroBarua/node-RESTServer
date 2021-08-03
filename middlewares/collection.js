const { User, Product } = require('../models');
const { ObjectId } = require('mongoose').Types;

const validCollections = ['user', 'product'];


const isCollection = async(req, res, next) => {

	const { collection, id } = req.params;

	if(!ObjectId.isValid(id)) return res.status(401).json({ msg: 'invalid id' });

	if(!validCollections.includes(collection)) return res.status(401).json({ msg: 'invalid collection' });

	const query = { _id: id, state: true }
	const document = collection == 'user'? 
									  await User.findOne(query)
									: await Product.findOne(query);

	if(!document) return res.status(401).json({ msg: `the ${collection} does not exist` });

	next();
}

module.exports = isCollection;


