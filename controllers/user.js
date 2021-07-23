const { request, response } = require('express');


const getUser = (req = request, res = response) => {
	
	const {page = 1, limit = 10} = req.query;
	res.json({
		page,
		limit,
		message: 'get api -controller'
	});
}

const postUser = (req, res = response) => {
	const {name, age} = req.body;
	res.status(201).json({
		name,
		age,
		message: 'post api - controller',
	});
}

const putUser = (req, res = response) => {

	const {id} = req.params;

	res.json({
		id,
		message: 'put api -controller'
	});
}

const deleteUser = (req, res = response) => {
	
	res.json({
		message: 'delete api -controller'
	});
}

module.exports = { 
	getUser, 
	postUser,
	putUser,
	deleteUser
									
}