import express, { Router, Request, Response } from "express";
import User from "../models/User";
import appDataSource from "../utils/connect";
import bcrypt from 'bcrypt';
import generateToken from "../utils/jwt";
import AuthMiddleware from "../middlewares/AuthMiddleware";

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

        const {username, password, realName} = req.body;

        const saltRounds: number = 10;
        const salt: string = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);

        await appDataSource.then(async () => (await appDataSource)
            .createQueryBuilder()
            .insert()
            .into(User)
            .values({
                username: username,
                pwhash: hashedPassword,
                fullname: realName
            })
            .execute()
        );

        res.status(200).json({ message: 'Usuario creado'});
    }

    public async loginUser(req: Request, res: Response){
        const {username, password} = req.body;

        const user = await appDataSource.then(async () => (await appDataSource)
            .manager.findBy(User, {
                username: username
            })
        );

        if(user[0].username && (password === user[0].pwhash)){
            res.status(201).json({
                username: user[0].username,
                realName: user[0].fullname,
                token: generateToken(user[0].username)
            });
        }
    }

    private async updateUser(req: Request, res: Response){
        await appDataSource.then(async () => (await appDataSource)
            .createQueryBuilder()
            .update(User)
            .set({ username: "nombre"})
            .where("username = :username", {username: req.params.username})
            .execute()
        );
        
        res.status(200).json({ message: 'Usuario actualizado'});
    }

    private async deleteUser(req: Request, res: Response){
        await appDataSource.then(async () => (await appDataSource)
            .createQueryBuilder()
            .delete()
            .from(User)
            .where("username = :username", {username: req.params.username})
            .execute()
        );

        res.status(200).json({ message: 'Usuario eliminado'});
    }

    private routes(){
        this.router.route('/')
            .get(this.getUsers)
            .post(this.postUser);
        this.router.route('/:username')
            .put(AuthMiddleware.check, this.updateUser)
            .delete(AuthMiddleware.check, this.deleteUser);
        this.router.post("/login", this.loginUser);
    }
}

export default UserController;