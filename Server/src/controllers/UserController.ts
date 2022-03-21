import express, { Router, Request, Response } from "express";
import User from "../models/User";
import appDataSource from "../utils/connect";

class UserController{
    private router: Router;

    constructor(){
        this.router = Router();
        this.router.use(express.json())
        this.router.use(express.urlencoded({extended: false}))
        this.routes();
    }

    public getRouter(){
        return this.router;
    }

    private async getUsers(req: Request, res: Response){
        const users = await appDataSource.then(async () => (await appDataSource)
            .getRepository(User)
            .createQueryBuilder("users")
            .getMany()
        );
       
        res.status(200).json(users);
    }

    private async postUser(req: Request, res: Response){
        console.log(req.body)

        const user_name = req.body.user_name;
        const pwhash = req.body.pwhash;
        const real_name = req.body.real_name;

        await appDataSource.then(async () => (await appDataSource)
            .createQueryBuilder()
            .insert()
            .into(User)
            .values({
                user_name: user_name,
                pwhash: pwhash,
                real_name: real_name 
            })
            .execute()
        );

        res.status(200).json({ message: 'Usuario creado'});
    }

    private async updateUser(req: Request, res: Response){
        await appDataSource.then(async () => (await appDataSource)
            .createQueryBuilder()
            .update(User)
            .set({ user_name: "tttt"})
            .where("user_name = :user_name", {user_name: req.params.username})
            .execute()
        );
        
        res.status(200).json({ message: 'Usuario actualizado'});
    }

    private async deleteUser(req: Request, res: Response){
        await appDataSource.then(async () => (await appDataSource)
            .createQueryBuilder()
            .delete()
            .from(User)
            .where("user_name = :user_name", {user_name: req.params.username})
            .execute()
        );

        res.status(200).json({ message: 'Usuario eliminado'});
    }

    private routes(){
        this.router.route('/')
            .get(this.getUsers)
            .post(this.postUser);
        this.router.route('/:username')
            .put(this.updateUser)
            .delete(this.deleteUser);
    }
}

export default UserController;