const express = require('express');
const cors = require('cors');
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
	}

	routes(){
		
		this.app.use(this.paths.auth, require('../routes/auth'));
		this.app.use(this.paths.users, require('../routes/users'));
		this.app.use(this.paths.categories, require('../routes/categories'));
		this.app.use(this.paths.products, require('../routes/products'));

		
	}
	
	listen(){

		this.app.listen(this.port, () => {
			console.log(`App listening at http://localhost:${this.port}`);
		})
	}
}

module.exports = Server;