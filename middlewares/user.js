const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');

const isAdminRole = (req, res, next) => {

	const {role} = req.user;

	if(role !== 'ADMIN_ROLE') return res.status(401).json({msg: 'invalid role'});
	next();
}

const isSameUserId = (req, res, next) => {

	const {role, id} = req.user;
	if(role == 'USER_ROLE'){
		if(!(id == req.params.id)) return res.status(401).json({msg: 'invalid user'});
	}
	
	next();
}

const isUserId = async(req, res, next) => {

	const { id } = req.params;

	if(!ObjectId.isValid(id)) return res.status(401).json({ msg: 'invalid id' });

	const user = await User.findOne({ _id: id, state: true});
	if(!user) return res.status(401).json({ msg: `the ID ${id} not exists` });
	
	next();
}

module.exports = {
	isAdminRole,
	isSameUserId,
	isUserId

};