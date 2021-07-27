const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async(req = request, res = response, next) => {

	const token = req.header('x-token');
	if(!token) return res.status(401).json({msg: 'there is no token in the request'});

	try {
		
		const { id } = jwt.verify(token, process.env.SECRET_KEY);
		req.userAuth = await User.findById(id);

		next();

	} catch (error) {
		res.status(401).json({msg: 'invalid token'});
	}

}

module.exports = validateJWT;