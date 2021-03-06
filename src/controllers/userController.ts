import { User } from '../models/userModel';
import { Request, Response, NextFunction } from 'express';

export class UserController {

	public addNewUser(req: Request, res: Response, next: NextFunction) {
		let newUser = new User(req.body);

		newUser.save((err, user) => {
			if (err) {
				res.statusCode = 400;
				return next(err);
			}
			return res.json(user);
		});
	}

	public getUsers(req: Request, res: Response, next: NextFunction) {
		User.find({}, (err, user) => {
			if (err) {
				res.statusCode = 400;
				return next(err);
			}
			return res.json(user);
		});
	}

	public getUserWithID(req: Request, res: Response, next: NextFunction) {
		User.findById(req.params.userId, (err, user) => {
			if (err) {
				res.statusCode = 400;
				return next(err);
			}
			return res.json(user);
		});
	}

	public updateUser(req: Request, res: Response, next: NextFunction) {
		User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, (err, user) => {
			if (err) {
				res.statusCode = 400;
				return next(err);			
			}
			return res.json(user);
		});
	}

	public deleteUser(req: Request, res: Response, next: NextFunction) {
		User.remove({ _id: req.params.userId }, (err) => {
			if (err) {
				res.statusCode = 400;
				return next(err);
			}
			return res.json({ message: 'Successfully deleted user!' });
		});
	}
}