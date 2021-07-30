const { Category } = require('../models');

const isCategoryState = async(id) => {
	
	const {state} = await Category.findById(id);
	if(!state) throw new Error(`the ID ${id} not exists`);
}

const isNotCategoryDB = async(name) => {
	
	const category = await  Category.findOne({name: name.toUpperCase()});
	if(category) throw new Error(`${name} already exists`);

}

module.exports = { 
	isCategoryState,
	isNotCategoryDB
}