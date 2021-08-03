const { User, Product } = require('../models');
const bcryptjs = require('bcryptjs');
const { ObjectId } = require('mongoose').Types;


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


const getUser = async(req, res) => {
	
	const { info } = req.params;

	const query = { state: true, role: "USER_ROLE" }

	if(ObjectId.isValid(info)){
		query._id = info;
		const user = await User.find(query);
		return res.json({
			user
		});
	}

	const regex = new RegExp(info, 'i');
	const users = await User.find({
		$or: [{ name: regex }, { email: regex }],
		$and: [ query ]
	});

	return res.json({
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
	const query = {state: false};
	const userDB = await User.findByIdAndUpdate(id, query);
	await Product.updateMany({ user: id }, query);

	res.json({
		userDB, 
		
	});
}

module.exports = { 
	getUsers, 
	getUser, 
	postUser,
	putUser,
	deleteUser
									
}