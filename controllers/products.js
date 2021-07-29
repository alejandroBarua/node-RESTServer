const { Product } = require('../models');

const createProduct = async(req, res) => {

	const name = req.body.name.toUpperCase();

	const data = {
		name,
		user: req.user._id,
	}

	const product = new Product(data);
	await product.save();

	res.status(201).json(product);
}


const getProducts = async(req, res) => {
	
	const {since = 0, limit = 10} = req.query;
	const query = { state: true };

	const [total, products] = await Promise.all([
			Product.countDocuments(query),
			Product.find(query)
					.populate('user', 'name')
					.skip(Number(since))
					.limit(Number(limit))
	]);

	res.json({
		total,
		products
	});
}

module.exports = {
	createProduct,
	getProducts,

}