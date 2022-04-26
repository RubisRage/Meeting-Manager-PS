import {Request, Response, NextFunction} from "express";

class AccessMiddleware{

    public static async check(req: Request, res: Response, next: NextFunction){
        if(req.params.username !== req.username) {
            res.status(403).json({
                message: "Forbidden access."
            })

            return;
        }

        next();
    }
}

export default AccessMiddleware;
