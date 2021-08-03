const { Category, Product } = require('../models');

const createCategory = async(req, res) => {

	const {state, user, name} = req.body;
	const data = {
		name: name.toUpperCase(),
		user: req.user._id
	}

	const category = new Category(data);
	await category.save();

	res.status(201).json(category);
}


const getCategories = async(req, res) => {
	
	const {since = 0, limit = 10} = req.query;
	const query = { state: true };

	const [total, categories] = await Promise.all([
			Category.countDocuments(query),
			Category.find(query)
					.populate('user', 'name')
					.skip(Number(since))
					.limit(Number(limit))
	]);

	res.json({
		total,
		categories
	});
}

const getCategory = async(req, res) => {

	const {id} = req.params;
	const category = await Category.findById(id).populate('user', 'name');

	res.json({
		category
	});
}

const putCategory = async(req, res) => {

	const {id} = req.params;
	const { user, name, ...data } = req.body;

	if(name) data.name = name.toUpperCase();
	data.user = req.user._id;

	console.log(id, data)
	const category = await  Category.findByIdAndUpdate(id, data);

	res.json({
		category
	});
}

const deleteCategory = async(req, res) => {
	
	const {id} = req.params;

	const query = {state: false};
	const category = await Category.findByIdAndUpdate(id, query);
	await Product.updateMany({ category: id }, query);

	res.json({
		category
	});
}

module.exports = {
	createCategory,
	getCategories,
	getCategory,
	putCategory,
	deleteCategory
}