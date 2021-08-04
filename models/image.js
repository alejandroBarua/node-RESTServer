const { Schema, model} = require('mongoose');

const imageSchema = Schema({
	name: {
		type: String,
		require: true
	},
	product: {
		type: Schema.Types.ObjectId,
		ref: 'Product',
		require: true
	}
})

imageSchema.methods.toJSON = function(){
	const { state, _id, ...image} = this.toObject();
	image.id = _id;
	return image;
}

module.exports = model('Image', imageSchema);