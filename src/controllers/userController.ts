import { User } from '../models/userModel';
import { Request, Response } from 'express';

export class UserController {

	public addNewUser(req: Request, res: Response) {
		let newUser = new User(req.body);

		newUser.save((err, user) => {
			if (err) {
				return res.status(400).send(err);
			}
			res.json(user);
		});
	}

	public getUsers(req: Request, res: Response) {
		User.find({}, (err, user) => {
			if (err) {
				return res.status(400).send(err);
			}
			res.json(user);
		});
	}

	public getUserWithID(req: Request, res: Response) {
		User.findById(req.params.userId, (err, user) => {
			if (err) {
				return res.status(400).send(err);
			}
			res.json(user);
		});
	}

	public updateUser(req: Request, res: Response) {
		User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, (err, user) => {
			if (err) {
				return res.status(400).send(err);
			}
			res.json(user);
		});
	}

	public deleteUser(req: Request, res: Response) {
		User.remove({ _id: req.params.userId }, (err, user) => {
			if (err) {
				return res.status(400).send(err);
			}
			res.json({ message: 'Successfully deleted user!' });
		});
	}
}