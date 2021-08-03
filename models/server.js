const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config');

class Server {
	
	constructor(){
		this.app = express();
		this.port = process.env.PORT;

		this.paths = {
			auth: '/api/auth',
			users: '/api/users',
			categories: '/api/categories',
			products: '/api/products',
			search: '/api/search',
			upload: '/api/upload',
		}

		// conexion database

		this.connectionDB();

		// middlewares
		this.middlewares();

		this.routes();
	}

	async connectionDB(){
		await dbConnection();
	};

	middlewares(){

		// cors
		this.app.use(cors());

		// lectura y parseo del body
		this.app.use(express.json());

		this.app.use(express.static('public'));

		// fileupload
		this.app.use(fileUpload({
			createParentPath: true,
    	useTempFiles : true,
    	tempFileDir : '/tmp/'
		}));

	}

	routes(){
		
		this.app.use(this.paths.auth, require('../routes/auth'));
		this.app.use(this.paths.users, require('../routes/users'));
		this.app.use(this.paths.categories, require('../routes/categories'));
		this.app.use(this.paths.products, require('../routes/products'));
		this.app.use(this.paths.search, require('../routes/search'));
		this.app.use(this.paths.upload, require('../routes/upload'));

		
	}
	
	listen(){

		this.app.listen(this.port, () => {
			console.log(`App listening at http://localhost:${this.port}`);
		})
	}
}

module.exports = Server;