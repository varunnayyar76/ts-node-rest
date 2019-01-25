import { Request, Response, NextFunction } from "express";
import { AuthMiddleware } from "../middlewares/authMiddleware";
import { UserController } from "../controllers/userController";
import { AuthController } from "../controllers/authController";
import { ProfileController } from "../controllers/profileController";


export class Routes {

	public authMiddleware: AuthMiddleware = new AuthMiddleware()
	public authController: AuthController = new AuthController()
	public userController: UserController = new UserController()
	public profileController: ProfileController = new ProfileController()


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

		// User Profile
		app.route('/user/profile')
			.get(this.authMiddleware.verifyToken, this.profileController.profile)
			.put(this.authMiddleware.verifyToken, this.profileController.updateProfile);
		
		// User Profile Photo
		app.route('/user/profile/upload')
			.post(this.profileController.uploadPhoto);

		app.use('*', function(req: Request, res: Response) {
			res.statusCode = 404;
			throw new Error('Page Not Found');
		});

		app.use(function(err: Error, req: Request, res: Response, next: NextFunction) {
			// Log error message
			console.error(err.message);
			// If err has no specified error code, set error code to 'Internal Server Error (500)'
			if (!res.statusCode) res.statusCode = 500;
			//Error with its status code and message
			res.status(res.statusCode).json({
				message: err.message
			}); 
		});
	}
}