const { response } = require('express');

const validateState = (req, res = response, next) => {

	const {state} = req.userAuth;

	if(!state) return res.status(401).json({msg: 'user was deleted'});
	next();
}

module.exports = validateState;