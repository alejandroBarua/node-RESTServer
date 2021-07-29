const { User, Role} = require('../models');

const isValidRole = async(role) => {

	const user = await Role.findOne({role});
	if(!user) throw new Error(`It is not a valid role`);
}

const findUserByEmail = async(email) => {
	
	const emailDB = await User.findOne({email});
	if(emailDB) throw new Error(`the email ${email} already exists`);
}

const findUserById = async(id) => {
	
	const idDB = await User.findById(id);
	if(!idDB) throw new Error(`the ID ${id} not exists`);
}

module.exports = { 
	findUserByEmail,
	findUserById,
	isValidRole, 
}