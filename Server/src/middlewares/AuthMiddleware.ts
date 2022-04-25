import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import { json } from 'stream/consumers';
import User from '../models/User';
import appDataSource from '../utils/connect';

declare global {
    namespace Express {
        interface Request {
            user: any
        }
    }
}

class AuthMiddleware{

    public static async check(req: Request, res: Response, next: NextFunction){
        const authHeader = req.headers.authorization;
        if(authHeader && authHeader.startsWith('Bearer')){
            const token = authHeader.split(' ')[1];
            if(token == null){
                res.sendStatus(401);
            }

            const decoded: any = jwt.verify(token, 'secretHarcoded');

            console.log(decoded.username);

            const user = await appDataSource.then(async () => (await appDataSource)
                .createQueryBuilder()
                .select(["u.user_name", "u.real_name"])
                .from("users", "u")
                .where("user_name = :user_name", {user_name: decoded.id})
                .getOne()
            );

            console.log(user);
            req.user = user;

            res.sendStatus(200);
            next()
        }else{
            res.status(401).json({error : "Sin privilegios"})
        }
    }
}

export default AuthMiddleware