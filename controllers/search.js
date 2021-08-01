const { Product } = require('../models');
const { ObjectId } = require('mongoose').Types;

const search = async(req, res) => {

	const {since = 0, limit = 10, category = '', product = ''} = req.query;
	
	if(ObjectId.isValid(product)){
		const products = await Product.find({_id: product, state: true})
																	.populate('user', 'name')
		
		return res.json({
			results: products ? [products] : []
		});
	}
	
	const regex = new RegExp(product, 'i');
	const query = { name: regex, state: true };
	if(category) query.category = category;

	const [total, products] = await Promise.all([
		Product.countDocuments(query),
		Product.find(query)
						.populate('user', 'name')
						.skip(Number(since))
						.limit(Number(limit))
	]);
	
	return res.json({
		total,
		results: products ? [products] : []
	});
}

module.exports = {
	search,

}