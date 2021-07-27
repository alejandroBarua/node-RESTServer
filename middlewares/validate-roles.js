const { response } = require('express');

const isAdminRole = async(req, res = response, next) => {

	const {role} = req.userAuth;

	if(role !== 'ADMIN_ROLE') return res.status(401).json({msg: 'invalid role'});
	next();
}

const isRole = (...roles) => {

	return (req, res = response, next) => {
		
		if(!roles.includes(req.userAuth.role)) return res.status(401).json({msg: 'invalid role'});

		next();
	}
	
}


module.exports = {
	isAdminRole,
	isRole

};