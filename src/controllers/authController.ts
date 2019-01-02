import * as dotenv from "dotenv";
import { User } from '../models/userModel';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs'
import { NextFunction } from "express-serve-static-core";

dotenv.config();

const secret = process.env.SECRET;

export class AuthController {

	public register(req: Request, res: Response, next: NextFunction) {
		const userData = req.body;
		const password = (userData && userData.password) ? userData.password : null;
		res.statusCode = 400;

		if (!password) {
			throw new Error('Password is required.');
		}
		try {
			userData.password = bcrypt.hashSync(password, 8);
		} catch (e) {
			throw new Error(e);
		}
		User.create(userData, (err, user) => {
			if (err) {
				return next(err);
			}
			try {
				// create a token
				const token = jwt.sign({ id: user._id }, secret, {
					expiresIn: 86400 // expires in 24 hours
				});
				return res.status(200).json({
					status: 'success',
					data: {
						token: token
					}
				})
			} catch (e) {
				return next(e);
			}
		})
	}

	public login(req: Request, res: Response, next: NextFunction) {
		const userData = req.body;
		const email = (userData && userData.email) ? userData.email : null;
		const password = (userData && userData.password) ? userData.password : null;
		res.statusCode = 400;

		if (!email || !password) {
			throw new Error('Email or Password not provided.');
		}

		User.findOne({ email: email }, (err, user) => {
			if (err) {
				return next(err);
			}

			if (!user) {
				res.statusCode = 401;
				return next(new Error('Invalid username or password.'));
			}

			try {
				const validatePassword = bcrypt.compareSync(password, user.password);

				if (validatePassword) {
					const token = jwt.sign({ id: user._id }, secret, {
						expiresIn: 86400 // expires in 24 hours
					});

					return res.status(200).json({
						status: 'success',
						data: {
							token: token
						}
					})
				}
			} catch (e) {
				return next(e);
			}

			return next(new Error('Invalid email or password.'));
		});
	}
}