const { Schema, model} = require('mongoose');

const categorySchema = Schema({
	name: {
		type: String,
		require: true,
		unique: true
	},
	state: {
		type: Boolean,
		default: true
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		require: true
	}
})

categorySchema.methods.toJSON = function(){
	const { __v, state, _id, ...category} = this.toObject();
	category.id = _id;
	return category;
}

module.exports = model('Category', categorySchema);