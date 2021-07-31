const { Schema, model} = require('mongoose');

const productSchema = Schema({
	name: {
		type: String,
		require: true
	},
	description: {
		type: String
	},
	price: {
		type: Number,
		default: 0
	},
	count: {
		type: Number,
		default: 0
	},
	available: {
		type: Boolean,
		default: true
	},
	state: {
		type: Boolean,
		default: true
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		require: true
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: 'Category',
		require: true
	},
	
})

productSchema.methods.toJSON = function(){
	const { __v, state, _id, ...product} = this.toObject();
	product.id = _id;
	return product;
}

module.exports = model('Product', productSchema);