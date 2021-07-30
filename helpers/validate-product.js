const { Product } = require('../models');

const isProductState = async(id) => {
	
	const {state} = await Product.findById(id);
	if(!state) throw new Error(`the ID ${id} not exists`);
}

const isNotProductDB = async(name) => {
	
	const product = await  Product.findOne({name: name.toUpperCase()});
	if(product) throw new Error(`${name} already exists`);

}

module.exports = { 
	isNotProductDB,
	isProductState
}