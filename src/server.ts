require('dotenv').config()
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import mongoose from 'mongoose'

import indexRoutes from './routes/index.routes'

class Server {
	public app: express.Application

	constructor() {
		this.app = express()
		this.config()
		this.routes()
	}

	config() {
		mongoose.connect(
			`mongodb+srv://<username>:<password>@nodejsplatzi.cg57m.mongodb.net/<dbname>?retryWrites=true&w=majority`,
		)
		this.app.set('port', process.env.PORT || 4444)
		//Middlewares
		this.app.use(morgan('dev'))
		this.app.use(helmet())
	}

	routes() {
		this.app.use('/', indexRoutes)
	}

	start() {
		this.app.listen(this.app.get('port'), () =>
			console.log(`Server running on port ${this.app.get('port')}`),
		)
	}
}

const server = new Server()
server.start()
