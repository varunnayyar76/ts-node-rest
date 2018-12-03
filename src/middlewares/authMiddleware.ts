import * as dotenv from "dotenv";
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

const secret = process.env.SECRET;

export class AuthMiddleware {

	public verifyToken(req: Request, res: Response, next: NextFunction) {
		const token = req.headers['x-access-token'];
		var errFlag = false;

		if (!token) {
			return res.status(401).send({
				errors: {
					token: {
						message: 'Token is required.'
					}
				},
				message: "Token verification failed.",
				name: "VerificationError"
			})
		}

		try {
			jwt.verify(token, secret, function (err, decoded) {
				if (err){
					errFlag = true;
				} else {
					req.body.user_id = decoded.id;
					return next();
				}
			});  
		} catch (err) {
      errFlag = true;
		}
		
    if(errFlag) {
    	return res.status(500)
					.send({
						error: {
							token: {
								message: 'Failed to authenticate token.'
							}
						},
						message: "Failed to authenticate token.",
						name: "VerificationError"
				})
    }
	}
}