const { User, Product } = require('../models');
const bcryptjs = require('bcryptjs');

const getUsers = async(req, res) => {
	
	const {since = 0, limit = 10} = req.query;
	const query = { state: true, role: "USER_ROLE" };

/* 	const users = await User.find(query)
												.skip(Number(since))
												.limit(Number(limit));
	
	const total = await User.countDocuments(query); */

	const [total, users] = await Promise.all([
			User.countDocuments(query),
			User.find(query)
					.skip(Number(since))
					.limit(Number(limit))
	]);

	res.json({
		total,
		users
	});
}

const postUser = async(req, res) => {
	
	const {state, role, name, email, password} = req.body;
	const user = new User({name, email, password});

	const salt = bcryptjs.genSaltSync();
	user.password = bcryptjs.hashSync(password, salt);

	await user.save();

	res.status(201).json({
		user
	});
}

const putUser = async(req, res) => {

	const {id} = req.params;
	const {role, google, email, password, ...other} = req.body;

	const user = await  User.findByIdAndUpdate(id, other);

	res.json({
		user
	});
}


const deleteUser = async(req, res) => {
	
	const {id} = req.params;

	//const user = await User.findByIdAndDelete(id);
	const userDB = await User.findByIdAndUpdate(id, {state: false});
	await Product.updateMany({ user: id }, {state: false});

	res.json({
		userDB, 
		
	});
}

module.exports = { 
	getUsers, 
	postUser,
	putUser,
	deleteUser
									
}