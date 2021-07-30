const { Product, Category } = require('../models');

const createProduct = async(req, res) => {

	const { name, description, price, category } = req.body;

	const categoryDB = await Category.findOne({name: category.toUpperCase()});

	const data = {
		name: name.toUpperCase(),
		description,
		price,
		category: categoryDB._id,
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


const getProduct = async(req, res) => {

	const {id} = req.params;
	const product = await Product.findById(id)
															 .populate('user', 'name')
															 .populate('category', 'name');

	res.json({
		product
	});
}

const putProduct = async(req, res) => {

	const {id} = req.params;
	const { name, category, ...data } = req.body;

	const categoryDB = await Category.findOne({name: category.toUpperCase()});

	data.name = name.toUpperCase();
	data.category = categoryDB._id;
	data.user = req.user._id;

	const product = await Product.findByIdAndUpdate(id, data);

	res.json({
		product
	});
}

const deleteProduct = async(req, res) => {
	
	const {id} = req.params;
	const product = await Product.findByIdAndUpdate(id, {state: false});

	res.json({
		product
	});
}

module.exports = {
	createProduct,
	getProducts,
	getProduct,
	putProduct,
	deleteProduct

}