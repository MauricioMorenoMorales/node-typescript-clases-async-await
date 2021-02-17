import { Request, Response, Router } from 'express'

import PostModel from '../models/Posts'

class PostRoutes {
	router: Router
	constructor() {
		this.router = Router()
		this.routes()
	}

	async getPosts(req: Request, res: Response) {
		const posts = await PostModel.find()
		res.json(posts)
	}

	async getPost(req: Request, res: Response) {}

	createPost(req: Request, res: Response) {
		console.log(req.body)
		res.json('data received')
	}

	updatePost(req: Request, res: Response) {}

	deletePost(req: Request, res: Response) {}

	routes() {
		this.router.get('/', this.getPosts)
		this.router.get('/:url', this.getPost)
		this.router.post('/', this.createPost)
		this.router.put('/:url', this.updatePost)
		this.router.delete('/:url', this.deletePost)
	}
}

const postRoutes = new PostRoutes()
export default postRoutes.router
