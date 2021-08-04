const { Image } = require('../models');
const { ObjectId } = require('mongoose').Types;

const isImageId = async(req, res, next) => {

	const { collection } = req.params;

	if(!(collection == 'product')) return next();

	const { files } = req.body;

	for(let i = 0; i < files.length; i++){

		if(!ObjectId.isValid(files[i])) return res.status(401).json({ msg: 'invalid id' });

		const image = await Image.findById(files[i]);
		if(!image) return res.status(401).json({ msg: `the file does not exist` });
	}

	next();
}

module.exports = isImageId;