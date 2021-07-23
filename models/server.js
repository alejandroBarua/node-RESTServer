const express = require('express');
const cors = require('cors');

class Server {
	
	constructor(){
		this.app = express();
		this.port = process.env.PORT;
		this.routeUser = '/api/user';

		// middlewares
		this.middlewares();

		this.routes();
	}

	middlewares(){

		// cors
		this.app.use(cors());

		// lectura y parseo del body
		this.app.use(express.json());

		this.app.use(express.static('public'));
	}

	routes(){
		
		this.app.use(this.routeUser, require('../routes/user'));
	}
	
	listen(){

		this.app.listen(this.port, () => {
			console.log(`App listening at http://localhost:${this.port}`);
		})
	}
}

module.exports = Server;