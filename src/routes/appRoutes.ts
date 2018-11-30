import { Request, Response } from "express";
import { UserController } from "../controllers/userController";

export class Routes {

	public userController: UserController = new UserController()

	public routes(app): void {

		app.route('/')
			.get((req: Request, res: Response) => {
				res.status(200).send({
					message: 'Go!!!!!'
				})
			})

		// User 
		app.route('/user')
			.get(this.userController.getUsers)

			// POST endpoint
			.post(this.userController.addNewUser);

		// User detail
		app.route('/user/:userId')
			// get specific user
			.get(this.userController.getUserWithID)
			.put(this.userController.updateUser)
			.delete(this.userController.deleteUser)
	}
}