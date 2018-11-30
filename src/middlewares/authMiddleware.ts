import * as dotenv from "dotenv";
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

const secret = process.env.SECRET;

export class AuthMiddleware {

  public verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['x-access-token'];

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

    jwt.verify(token, secret, function (err, decoded) {
      if (err){
        return res.status(500)
        .send({errors: {
          token: {
            message: 'Failed to authenticate token.'
          }
        },
        message: "Failed to authenticate token.",
        name: "VerificationError"})
      }
      
      req.body.user_id = decoded.id;
      
      next();
    });
  }
}