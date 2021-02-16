import { Request, Response, Router } from 'express'

class PostRoutes {
	router: Router
	constructor() {
		this.router = Router()
		this.routes()
	}

	getPosts(req: Request, res: Response) {
		res.send('posts')
	}

	getPost(req: Request, res: Response) {}

	createPost(req: Request, res: Response) {}

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
