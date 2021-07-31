
const isAdminRole = async(req, res, next) => {

	const {role} = req.user;

	if(role !== 'ADMIN_ROLE') return res.status(401).json({msg: 'invalid role'});
	next();
}


module.exports = {
	isAdminRole,

};