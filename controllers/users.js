const { request, response } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const getUsers = async(req = request, res = response) => {
	
	const {since = 0, limit = 10} = req.query;
	const query = { state: true };

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

const postUser = async(req, res = response) => {
	
	const {name, email, password, role} = req.body;
	const user = new User({name, email, password, role});

	const salt = bcryptjs.genSaltSync();
	user.password = bcryptjs.hashSync(password, salt);

	await user.save();

	res.status(201).json({
		user
	});
}

const putUser = async(req, res = response) => {

	const {id} = req.params;
	const {google, email, password, ...other} = req.body;

	if(password){
		const salt = bcryptjs.genSaltSync();
		other.password = bcryptjs.hashSync(password, salt);
	}

	const user = await  User.findByIdAndUpdate(id, other);

	res.json({
		user
	});
}


const deleteUser = async(req, res = response) => {
	
	const {id} = req.params;
	const userAuth = req.userAuth;

	//const user = await User.findByIdAndDelete(id);
	const user = await User.findByIdAndUpdate(id, {state: false});

	res.json({
		user, 
		userAuth
	});
}

module.exports = { 
	getUsers, 
	postUser,
	putUser,
	deleteUser
									
}