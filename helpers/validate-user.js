const { User, Role} = require('../models');

const isValidRole = async(role) => {

	const user = await Role.findOne({role});
	if(!user) throw new Error(`It is not a valid role`);
}

const isNotEmailDB = async(email) => {
	
	const user = await User.findOne({email});
	if(user) throw new Error(`the email ${email} already exists`);
}

const isUserIdBD = async(id) => {
	
	const user = await User.findById(id);
	if(!user) throw new Error(`the ID ${id} not exists`);
}

module.exports = { 
	isNotEmailDB,
	isUserIdBD,
	isValidRole, 
}