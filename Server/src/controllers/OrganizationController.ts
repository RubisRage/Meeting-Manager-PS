import express, {Router, Request, Response} from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import appDataSource from "../utils/connect";
import Organization from "../models/Organization";
import User from "../models/User";
import Belongs from "../models/Belongs";

class OrganizationController{

    private readonly router: Router;

    constructor(){
        this.router = Router();
        this.router.use(express.json())
        this.routes();
    }

    public getRouter(){
        return this.router;
    }

    private routes(){
        this.router.post("/", AuthMiddleware.check, this.createOrganization);
        this.router.delete("/:id", AuthMiddleware.check, this.deleteOrganization);
        this.router.get("/:id/users", this.getMembers);
        this.router.route("/:id/users/:username")
            .get(AuthMiddleware.check, this.getOrganization)
            .post(AuthMiddleware.check, this.addMember)
            .delete(AuthMiddleware.check, this.removeMember)
            .put(AuthMiddleware.check, this.updateAdmin);
    }

    private async createOrganization(req: Request, res: Response) {
        const {name, description, imgURL} = req.body;

        if(name === undefined || description === undefined || imgURL === undefined) {
            res.status(400).json({message: "Bad request, bad format!"});
            return;
        }

        const user = await ((await appDataSource)
                .manager
                .findOneBy(User, {
                    userId: req.userId
                })
        );

        if(!user) {
            res.status(400).json({message: "Bad request, user not found!"});
            return;
        }

        const newOrganization = new Organization();
        newOrganization.name = name;
        newOrganization.description = description;
        newOrganization.imgURL = imgURL;

        try {
            await ((await appDataSource)
                    .manager
                    .save(newOrganization)
            );
        } catch(err) {
            console.log(err)
        }

        const belongs = new Belongs();
        belongs.isAdmin = true;
        belongs.user = user;
        belongs.organization = newOrganization;

        try {
            await ((await appDataSource)
                    .manager
                    .save(belongs)
            );
        } catch(err) {
            console.log(err);
        }

        res.status(200).json(newOrganization);
    }

    private async getOrganization(req: Request, res: Response) {
        try {
            const belongsEntry = await ((await appDataSource)
                    .createQueryBuilder(Belongs, 'b')
                    .leftJoinAndSelect('organization', 'org', 'org.id = b.id' )
                    .leftJoinAndSelect('users', 'u', 'u.userId = b.userId')
                    .where('u.username = :username', {username: req.params.username})
                    .andWhere('b.id = :id', {id: req.params.id})
                    .getOneOrFail()
            );

            const org = await ((await appDataSource)
                    .manager
                    .findOneBy(Organization, {
                        id: belongsEntry.id
                    })
            );

            const resBody: any = {...org};
            resBody.isAdmin = belongsEntry.isAdmin;

            res.status(200).json(resBody);
        } catch(err) {
            console.log(err);
            res.status(404).json({message: "Specified user does not exist!"})
        }
    }

    private deleteOrganization() {

    }

    private async getMembers(req: Request, res: Response) {
        const members = await ((await appDataSource)
            .getRepository(User)
            .createQueryBuilder('users')
            .leftJoin('belongs', 'b', 'b.userId = users.userId')
            .where("b.id = :id", {id: req.params.id})
            .leftJoinAndSelect('organization', 'organization', 'organization.id = b.id')
            .getMany()
        );

        res.status(200).json(members);
    }

    private async addMember(req: Request, res: Response) {
        const newMember = await ((await appDataSource)
                .manager
                .findOneBy(User, {
                    username: req.params.username
                })
        )

        if(!newMember) {
            res.status(404).json({message: "Specified user does not exist"})
            return;
        }

        const belongs = new Belongs();
        belongs.userId = newMember.userId;
        belongs.id = req.params.id;
        belongs.isAdmin = false;

        await ((await appDataSource)
            .manager.save(belongs)
        );

        res.status(200).json({message: "User added to organization successfully!"});
    }

    private removeMember() {

    }

    private updateAdmin() {

    }
}

export default OrganizationController;