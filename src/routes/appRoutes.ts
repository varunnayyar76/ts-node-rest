import { Request, Response } from "express";
import { UserController } from "../controllers/userController";
import { AuthController } from "../controllers/authController";

export class Routes {

	public authController: AuthController = new AuthController()
	public userController: UserController = new UserController()


	public routes(app): void {

		//Authentication Routes
		app.route('/auth/register').post(this.authController.register);
		app.route('/auth/login').post(this.authController.login);

		// User 
		app.route('/user')
			.get(this.userController.getUsers)
			.post(this.userController.addNewUser);

		// User detail
		app.route('/user/:userId')
			// get specific user
			.get(this.userController.getUserWithID)
			.put(this.userController.updateUser)
			.delete(this.userController.deleteUser)

		app.route('*')
			.get((req: Request, res: Response) => {
				res.status(400).send({
					message: 'No route defined.'
				})
			})
	}
}