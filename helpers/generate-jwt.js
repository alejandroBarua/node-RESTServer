const jwt = require('jsonwebtoken');

const generateJWT = (id) => {
	
	return new Promise((res, rej) => {
		
		const payload = { id };

		jwt.sign( payload, process.env.SECRET_KEY, {
			expiresIn: '4h'
		}, (err, token) => {
			
				if(err){
					rej(err);
				}
				else{
					res(token);
				}
				
		})
	})
}


module.exports = {
	generateJWT
}