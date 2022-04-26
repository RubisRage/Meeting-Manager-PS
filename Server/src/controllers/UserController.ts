import express, { Router, Request, Response } from "express";
import User from "../models/User";
import appDataSource from "../utils/connect";
import generateToken from "../utils/jwt";
import generateHash from "../utils/hash";
import bcrypt from "bcrypt";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import AccessMiddleware from "../middlewares/AcessMiddleware";
import AcessMiddleware from "../middlewares/AcessMiddleware";
import Organization from "../models/Organization";
import Belongs from "../models/Belongs";

class UserController{
    private router: Router;

    constructor(){
        this.router = Router();
        this.router.use(express.json())
        this.routes();
    }

    private async findUser(username: string) {
        return (await appDataSource)
            .manager.findOneBy(User, {
                username: username
            });
    }

    public getRouter(){
        return this.router;
    }



    public async login(req: Request, res: Response){
        const {username, password} = req.body;

        if(username === undefined || password === undefined){
            res.status(400).json({
                message: "Bad request, username or password missing!"
            });

            return;
        }

        // const user = await this.findUser(username);
        const user = await (await appDataSource)
            .manager.findOneBy(User, {
                username: username
            });

        if(user === null) {
            res.status(400).json({
                message: "Bad request, user does not exist!"
            })

            return;
        }

        bcrypt.compare(password, user.pwhash, (err, result) => {
            if(result) {
                res.status(200).json({
                    token: generateToken(user.username)
                });
            } else {
                res.status(400).json({
                    message: "Bad request, bad credentials!"
                })
            }
        });

    }

    private async register(req: Request, res: Response){
        const {username, password, fullname, imgURL} = req.body;

        if(username === undefined || password === undefined || fullname === undefined) {
            res.status(400).json({
                message: "Bad request, bad request body format!"
            })

            return;
        }

        // const user = await this.findUser(username);
        const user = await (await appDataSource)
            .manager.findOneBy(User, {
                username: username
            });

        if(user !== null) {
            res.status(400).json({
                message: "Bad request, user already exists!"
            })

            return;
        }

        await ((await appDataSource)
                .createQueryBuilder()
                .insert()
                .into(User)
                .values({
                    username: username,
                    pwhash: generateHash(password),
                    fullname: fullname,
                    imgURL: imgURL
                })
                .execute()
        );

        res.status(200).json({
            message: 'User created successfully',
            Location: `/users/${username}`
        });
    }

    private async getUser(req: Request, res: Response){
        const user = await ((await appDataSource)
                .manager
                .findOneBy(User, {
                    username: req.params.username
                })
        );

        if(user === null) {
            res.status(404).json({message: "User not found!"})
            return;
        }

        res.status(200).json({
            username: user!.username,
            fullname: user!.fullname,
            imgURL: user!.imgURL
        })
    }

    private async updateUser(req: Request, res: Response){
        const {username, fullname, imgURL} = req.body;

        if(username === undefined || fullname === undefined || imgURL === undefined) {
            res.status(400).json({message: "Bad request, bad format!"})
            return;
        }


        const result = await ((await appDataSource)
                .createQueryBuilder()
                .update(User)
                .set({
                    username: username,
                    fullname: fullname,
                    imgURL: imgURL
                })
                .where("username = :username", {username: req.params.username})
                .execute()
        );

        console.log(result.affected);


        if(username !== req.username) {
            res.status(200).json({
                username: username,
                fullname: fullname,
                imgURL: imgURL,
                token: generateToken(username)
            });
        } else {
            res.status(200).json({
                username: username,
                fullname: fullname,
                imgURL: imgURL
            });
        }
    }

    private async deleteUser(req: Request, res: Response){
        await ((await appDataSource)
            .createQueryBuilder()
            .delete()
            .from(User)
            .where("username = :username", {username: req.params.username})
            .execute()
        );

        res.status(200).json({ message: 'User deleted successfully!'});
    }

    private async updatePassword(req: Request, res: Response) {
        const {oldPassword, newPassword} = req.body;

        if(oldPassword === undefined || newPassword === undefined) {
            res.status(400).json({message: "Bad request, wrong format!"});
            return;
        }

        const user = await ((await appDataSource)
                .manager
                .findOneBy(User, {
                    username: req.params.username
                })
        );

        if(user === null) {
            res.status(400).json({
                message: "Bad request, user does not exist!"
            })

            return;
        }

        bcrypt.compare(oldPassword, user.pwhash, async (err, result) => {
            if(result) {
                await ((await appDataSource)
                    .createQueryBuilder()
                    .update(User)
                    .set({
                        pwhash: generateHash(newPassword)
                    })
                    .where("username = :username", {username: req.params.username})
                    .execute()
                );

                res.status(200).json({message: "Password updated succesfully!"});
            } else {
                res.status(400).json({message: "Wrong password!"});
            }
        })
    }

    private async getOrganizations(req: Request, res: Response) {
        // const user = await ((await appDataSource)
        //         .getRepository(User)
        //         .createQueryBuilder()
        //         .innerJoinAndSelect("user.organizations", "organization")
        //         .where("username = :username", {username: req.params.username})
        //         .getOne()
        // );

        // const user = await ((await appDataSource)
        //         .getRepository(User)
        //         .findOne({
        //             relations: {
        //                 organizations: true
        //             },
        //             where: {
        //                 username: req.params.username
        //             }
        //         })
        // );
        //
        // console.log(user!.organizations);
        //
        // res.status(200).json(user!.organizations.map(org => {
        //     return {
        //         id: org.id,
        //         name: org.name
        //     }
        // }))

        const user = await ((await appDataSource)
                .getRepository(User)
                .findOne({
                    relations: {
                        belongsToOrganizations: true
                    },
                    where: {
                        username: req.params.username
                    }
                })
        );

        console.log(user);
        res.status(200).json(user);
    }

    private routes(){
        this.router.post('/login', this.login);
        this.router.post('/register', this.register);
        this.router.route('/:username')
            .get(AuthMiddleware.check, AccessMiddleware.check, this.getUser)
            .put(AuthMiddleware.check, AccessMiddleware.check, this.updateUser)
            .delete(AuthMiddleware.check, AccessMiddleware.check, this.deleteUser);
        this.router.put('/:username/password',
            AuthMiddleware.check,
            AcessMiddleware.check,
            this.updatePassword);
        this.router.get('/:username/organizations',
            AuthMiddleware.check,
            AccessMiddleware.check,
            this.getOrganizations);
    }
}

export default UserController;