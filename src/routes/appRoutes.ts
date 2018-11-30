import { Request, Response } from "express";
import { AuthMiddleware } from "../middlewares/authMiddleware";
import { UserController } from "../controllers/userController";
import { AuthController } from "../controllers/authController";

export class Routes {

	public authMiddleware: AuthMiddleware = new AuthMiddleware()
	public authController: AuthController = new AuthController()
	public userController: UserController = new UserController()


	public routes(app): void {

		//Authentication Routes
		app.route('/auth/register').post(this.authController.register);
		app.route('/auth/login').post(this.authController.login);

		// User 
		app.route('/user')
			.get(this.authMiddleware.verifyToken, this.userController.getUsers)
			.post(this.authMiddleware.verifyToken, this.userController.addNewUser);

		// User detail
		app.route('/user/:userId')
			// get specific user
			.get(this.authMiddleware.verifyToken, this.userController.getUserWithID)
			.put(this.authMiddleware.verifyToken, this.userController.updateUser)
			.delete(this.authMiddleware.verifyToken, this.userController.deleteUser)

		app.route('*')
			.get((req: Request, res: Response) => {
				res.status(400).send({
					message: 'No route defined.'
				})
			})
	}
}