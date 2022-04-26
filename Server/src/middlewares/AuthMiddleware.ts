import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import appDataSource from "../utils/connect";
import User from "../models/User";

declare global {
    namespace Express {
        interface Request {
            username: any
        }
    }
}

class AuthMiddleware{

    public static async check(req: Request, res: Response, next: NextFunction){
        const user = await ((await appDataSource)
            .manager
            .findOneBy(User, {
                username: req.params.username
            }));

        if(!user) {
            res.status(400).json({
                message: "Bad request."
            })

            return;
        }

        const authHeader = req.headers.authorization;

        if(authHeader && authHeader.startsWith('Bearer')){

            const token = authHeader.split(' ')[1];
            if(token === undefined){
                res.status(400).json({message: "Bad request, missing token!"});

                return;
            }

            let decoded: any;


            try {
                decoded = jwt.verify(token, process.env.SECRET as jwt.Secret);
            } catch(err) {
                console.log(err);
                res.status(400).json({message: "Bad request, invalid token!"})

                return;
            }


            req.username = decoded.username;

            next();
        }else{
            res.status(401).json({message: "Unauthorized"})
        }
    }
}

export default AuthMiddleware