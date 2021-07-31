
const isSameUserId = (req, res, next) => {

	const {role, id} = req.user;
	if(role == 'USER_ROLE'){
		if(!(id == req.params.id)) return res.status(401).json({msg: 'invalid user'});
	}
	
	next();
}
	
module.exports = isSameUserId;