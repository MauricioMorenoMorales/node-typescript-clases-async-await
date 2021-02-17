import { Request, Response, Router } from 'express'

import UserModel from '../models/User'

class UserRoutes {
	router: Router
	constructor() {
		this.router = Router()
		this.routes()
	}

	public async getUsers(req: Request, res: Response): Promise<void> {
		const user = await UserModel.find()
		res.json(user)
	}

	public async getUser(req: Request, res: Response): Promise<void> {
		const user = await UserModel.findOne({ username: req.params.username })
		res.json(user)
	}

	public async createUser(req: Request, res: Response): Promise<void> {
		const newUser = new UserModel(req.body)
		await newUser.save()
		res.json({ data: newUser })
	}

	public async updateUser(req: Request, res: Response): Promise<void> {
		const { username } = req.params
		const User = await UserModel.findOneAndUpdate({ username }, req.body, {
			new: true,
		})
		res.json(User)
	}

	public async deleteUser(req: Request, res: Response): Promise<void> {
		const { username } = req.params
		await UserModel.findOneAndDelete({ username })
		res.json({ response: 'User Deleted successfully' })
	}

	routes() {
		this.router.get('/', this.getUsers)
		this.router.get('/:username', this.getUser)
		this.router.post('/', this.createUser)
		this.router.put('/:username', this.updateUser)
		this.router.delete('/:username', this.deleteUser)
	}
}

const userRoutes = new UserRoutes()
export default userRoutes.router
