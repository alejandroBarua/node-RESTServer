const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async(req, res, next) => {

	const token = req.header('x-token');
	if(!token) return res.status(401).json({msg: 'there is no token in the request'});

	try {
		
		const { id } = jwt.verify(token, process.env.SECRET_KEY);
		const user = await User.findById(id);

		if(!user.state) return res.status(401).json({msg: 'user was deleted'});
		req.user = user;

		next();

	} catch (error) {
		res.status(401).json({msg: 'invalid token'});
	}

}

module.exports = validateJWT;