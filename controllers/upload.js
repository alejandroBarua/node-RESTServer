const { User, Image } = require('../models');

const path = require('path');
const fs = require('fs');

const { v4: uuidv4 } = require('uuid');
const { AsyncResource } = require('async_hooks');


const upload = (req, res) => {

	const { id, collection } = req.params;

	const files = Object.values(req.files)[0].length
								? Object.values(req.files)[0]
								: Object.values(req.files);
	
	files.forEach(file => {

		const type = file.mimetype.split('/')[1];
		const nameFile = uuidv4() + '.' + type;
		const uploadPath = path.join( __dirname, '../uploads/', collection, '/', nameFile);
		
		file.mv(uploadPath, async(err) => {
			if(err) return res.status(500).json({err});
			
			switch (collection) {
				case 'user':
					await User.findByIdAndUpdate(id, { image: nameFile });
					break;
				case 'product':
					const image = new Image({
						name: nameFile,
						product: id
					});
					await image.save();
					break;
				}
				
			});
			
		})
	
		res.status(201).json({ msg: 'Files upload'});
}

const deleteFiles = async(req, res) => {

	const { id, collection } = req.params;


	switch (collection) {
		case 'user':
			const { image } = await User.findByIdAndUpdate(id, { image: undefined });
			const pathFile = path.join( __dirname, '../uploads/', collection, '/', image);
			if(fs.existsSync(pathFile)) fs.unlinkSync(pathFile);
			break;
			
		case 'product':
			const { files } = req.body; // idImage
			files.forEach( async(idFile) => {
				const { name } = await Image.findByIdAndDelete(idFile);
				const pathFile = path.join( __dirname, '../uploads/', collection, '/', name);
				if(fs.existsSync(pathFile)) fs.unlinkSync(pathFile);
			})
			break;
	}


		
			
	res.status(200).json({ msg: 'deleted file'});
}

module.exports = {
	upload,
	deleteFiles

};