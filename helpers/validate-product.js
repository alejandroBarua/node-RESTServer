const { Product } = require('../models');

const isProductState = async(id) => {
	
	const {state} = await Product.findById(id);
	if(!state) throw new Error(`the ID ${id} not exists`);
}

module.exports = { 
	isProductState
}