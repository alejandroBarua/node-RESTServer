const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');
const googleVerify = require('../helpers/google-verify');

const login = async(req, res) => {

	const { email, password } = req.body;

	try {
		
		const query = { email, state: true };
		const user = await User.findOne(query);
		if(!user) return res.status(400).json({msg: 'the email and password are not valid'});
		
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

const googleSignIn = async(req, res) => {

	const { id_token } = req.body;
	
	try {
		const {name, email, img} = await googleVerify(id_token);
		const query = { email, state: true };
		let user = await User.findOne(query);
		
		if(!user){
			const data = {
				name,
				email,
				password: '/&(95&',
				img,
				google: true
			};
			
			user = new User(data);
			await user.save();
		}

		if(!user.state) return res.status(401).json({msg: 'invalid user'});
		
		const token = await generateJWT(user.id);

		res.json({
			token,
			user
		})
		
	} catch (error) {
		res.status(400).json({msg: 'invalid token'})
	}
}

module.exports = {
	login,
	googleSignIn
}