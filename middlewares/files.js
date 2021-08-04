const { User, Image } = require('../models');

const maxFiles = (id, collection, files, max) => {
	
	return new Promise(async(resolve, reject) => {

		const countFiles = files.length;
		
		if(countFiles > max) return reject('maximum files reached');

		const query = { _id: id, state: true};
		const msg = 'the file could not be uploaded';

		switch (collection) {
			case 'user':
			const {image} = await User.findOne(query);
			if(image) return reject(msg);
			break;
			case 'product':
			const countImagesDB = await Image.countDocuments({product: id});
			const diference = max - countImagesDB;
			if(diference < countFiles) return reject(msg);
			break;
		}
		
		resolve();
	})
}

const isValidtype = (validTypes, files) => {

	return new Promise((resolve, reject) => {
		
		let result = true;
		
		files.forEach(file => {
			const type = file.mimetype.split('/')[1];
			if(!validTypes.includes(type)) result = false;
		})
		if(!result) return reject('file type error');

		resolve();
	})
}



const imageTypes = ['png', 'jpg', 'jpeg'];

const isValidFiles = async(req, res, next) => {
	
	const { id, collection } = req.params;
	// console.log(req.files); // name, size, tempFilePath, mimetype, mv()
	if( !req.files ) return res.status(400).json({msg: 'no files were uploaded'});
	
	const files = Object.values(req.files)[0].length
								? Object.values(req.files)[0]
								: Object.values(req.files);

	try {
		
		switch (collection) {
			case 'user':
				await maxFiles(id, collection, files, 1);
				await isValidtype(imageTypes, files);
				break;
			case 'product':
				await maxFiles(id, collection, files, 3);
				await isValidtype(imageTypes, files);
				break;
		}

	} catch (err) {
		return res.status(400).json({msg: err});
	}

	next();
}

module.exports = isValidFiles;

