const path = require('path');
const { v4: uuidv4 } = require('uuid');


const upload = (req, res) => {

	const { collection } = req.params;
	
	Object.values(req.files).forEach(file => {

		const type = file.mimetype.split('/')[1];
		const nameFile = uuidv4() + '.' + type;
		const uploadPath = path.join( __dirname, '../uploads/', collection, '/', nameFile);
		
		file.mv(uploadPath, (err) => {
			if(err) return res.status(500).json({err});
			res.json({ msg: 'File upload to ' + nameFile })
		});

	})

}

module.exports = {
	upload

};