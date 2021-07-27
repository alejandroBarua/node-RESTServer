const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');

const login = async(req, res = response) => {

	const { email, password } = req.body;

	try {
		
		const user = await User.findOne({ email });
		if(!user || !user.state) return res.status(400).json({msg: 'the email and password are not valid'});
		
		const validPassword = bcryptjs.compareSync(password, user.password);
		if(!validPassword) return res.status(400).json({msg: 'the email and password are not valid'});

		const token = await generateJWT(user.id);
		
		res.json({
			token,
			user
		})
		
	} catch (error) {

		return res.status(500);
	}

}

module.exports = {
	login
}