const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async(role = '') => {

	const findRole = await Role.findOne({role});
	if(!findRole) throw new Error(`It is not a valid role`);
}

const isValidEmail = async(email = '') => {
	
	const findEmail = await User.findOne({email});
	if(findEmail) throw new Error(`the email ${email} already exists`);
}

const isValidId = async(id) => {
	
	const findId = await User.findById(id);
	if(!findId) throw new Error(`the ID ${id} not exists`);
}

module.exports = { 
	isValidRole, 
	isValidEmail,
	isValidId
}