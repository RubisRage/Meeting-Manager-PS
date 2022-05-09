import {Request, Response, NextFunction} from "express";
import appDataSource from "../utils/connect";
import User from "../models/User";

class AccessMiddleware{

    public static async check(req: Request, res: Response, next: NextFunction){

        const user = await ((await appDataSource)
                .manager
                .findOneBy(User, {
                    userId: req.userId
                })
        )

        if(!user) {
            res.status(400).json({message: "Bad request."})
            return;
        }

        if(req.params.username !== user.username) {
            res.status(403).json({
                message: "Forbidden access."
            })

            return;
        }

        next();
    }
}

export default AccessMiddleware;
