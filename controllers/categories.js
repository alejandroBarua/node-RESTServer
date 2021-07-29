const { Category } = require('../models');

const createCategory = async(req, res) => {

	const name = req.body.name.toUpperCase();

	const data = {
		name,
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
	const {state, user, ...data} = req.body;
	data.name = data.name.toUpperCase();
	data.user = req.user._id;


	const category = await  Category.findByIdAndUpdate(id, {data});

	res.json({
		category
	});
}

const deleteCategory = async(req, res) => {
	
	const {id} = req.params;

	const category = await Category.findByIdAndUpdate(id, {state: false});

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