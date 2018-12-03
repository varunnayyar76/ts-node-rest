import * as dotenv from "dotenv";
import { User } from '../models/userModel';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs'

dotenv.config();

const secret = process.env.SECRET;

export class AuthController {

  public register(req: Request, res: Response) {
		const userData = req.body;
		const password = (userData && userData.password) ? userData.password : '';

		if (!password) {
			return res.status(400).json({
				error: {
					message: 'Password is required.' ,
					type: "ValidationError"
				}
			})
		}

    userData.password = bcrypt.hashSync(password, 8);

		User.create(userData, (err, user) => {
			if (err) {
				return res.status(400).send(err)
			}

			// create a token
			const token = jwt.sign({ id: user._id }, secret, {
				expiresIn: 86400 // expires in 24 hours
			});

			return res.json({
					status: 'success',
					data: { 
						token: token
					}
				})
		})
  }
  
  public login (req: Request, res: Response) {
		const email = req.body.email;
		const password = req.body.password;

		if(!email || !password) {
			return res.status(400).json({
				error: {
					message: 'Email or Password not provided.',
					type: "insufficientParameters" 
				}
			})
		}
    
    User.findOne({email: email}, (err, user) => {
    	 if(err) {
    	 	 return res.status(400).json({
					error: {
						message: 'Unable to process request. Please try again.' ,
						type: "InvalidCredentials"
					}
				}) 
    	 }
       
       if(user) {
       	const validatePassword = bcrypt.compareSync(password, user.password);

	       if(validatePassword) {
	          const token = jwt.sign({ id: user._id }, secret, {
							expiresIn: 86400 // expires in 24 hours
						});

						return res.json({
								status: 'success',
								data: { 
									token: token
								}
							}) 
	       }
       }

       return res.status(400).json({
					error: {
						message: 'Invalid email or password.' ,
						type: "InvalidCredentials"
					}
				})
    })
  }
}