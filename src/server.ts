require('dotenv').config()
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import mongoose from 'mongoose'
import chalk from 'chalk'
import compression from 'compression'
import cors from 'cors'

import indexRoutes from './routes/index.routes'
import postsRoutes from './routes/posts.routes'
import userRoutes from './routes/user.routes'

class Server {
	public app: express.Application

	constructor() {
		this.app = express()
		this.config()
		this.routes()
	}

	config() {
		mongoose.set('useFindAndModify', true)
		mongoose
			.connect(
				`mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@nodejsplatzi.cg57m.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`,
				{ useUnifiedTopology: true, useNewUrlParser: true },
			)
			.then(() => console.log(`${chalk.inverse.blue('Database')} connected`))
			.catch(err =>
				console.log(`${chalk.inverse.red('Database')} Error: ${err}`),
			)
		//Configuration
		this.app.set('port', process.env.PORT || 4444)
		//Middlewares
		this.app.use(morgan('dev'))
		this.app.use(express.json())
		this.app.use(express.urlencoded({ extended: false }))
		this.app.use(helmet())
		this.app.use(compression())
		this.app.use(cors())
	}

	routes() {
		this.app.use('/', indexRoutes)
		this.app.use('/api/posts', postsRoutes)
		this.app.use('/api/users', userRoutes)
	}

	start() {
		this.app.listen(this.app.get('port'), () =>
			console.log(
				`${chalk.bgBlack('Server running on port ')}${chalk.inverse.blue(
					this.app.get('port'),
				)}`,
			),
		)
	}
}

const server = new Server()
server.start()
