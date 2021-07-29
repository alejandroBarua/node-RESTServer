
const isUserState = (req, res, next) => {

	const {state} = req.user;

	if(!state) return res.status(401).json({msg: 'user was deleted'});
	next();
}

module.exports = isUserState;