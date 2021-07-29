
const isAdminRole = async(req, res, next) => {

	const {role} = req.user;

	if(role !== 'ADMIN_ROLE') return res.status(401).json({msg: 'invalid role'});
	next();
}

const isUserRole = (...roles) => {

	return (req, res, next) => {
		
		if(!roles.includes(req.user.role)) return res.status(401).json({msg: 'invalid role'});

		next();
	}
	
}


module.exports = {
	isAdminRole,
	isUserRole

};