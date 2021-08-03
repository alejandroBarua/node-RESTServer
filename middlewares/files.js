
const validTypes = ['png', 'jpg', 'jpeg'];

const isValidFiles = async(req, res, next) => {
	
	const { collection } = req.params;
	// console.log(req.files); // name, size, tempFilePath, mimetype, mv()
	
	if( !req.files || Object.keys(req.files).length === 0){
		return res.status(400).json({ msg: 'No files were uploaded' });
	}
	
	if( collection === 'user' && Object.keys(req.files).length !== 1){
		return res.status(400).json({ msg: 'Only one image can be uploaded for the user' });
	}
	
	if( collection === 'product' && Object.keys(req.files).length > 3){
		return res.status(400).json({ msg: 'Only maximum five images can be uploaded for the product' });
	}
	
	let isvalidType = true;

	Object.values(req.files).forEach(el => {
		const type = el.mimetype.split('/')[1];
		if(!validTypes.includes(type)) isvalidType = false;
	})
	if(!isvalidType) return res.status(400).json({ msg: 'file type error' });

	next();
}

module.exports = isValidFiles;

