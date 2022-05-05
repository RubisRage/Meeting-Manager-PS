import express, {Router, Request, Response} from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import appDataSource from "../utils/connect";
import Organization from "../models/Organization";
import User from "../models/User";
import Belongs from "../models/Belongs";

class OrganizationController{

    private router: Router;

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
        this.router.route("/:id")
            .get(AuthMiddleware.check, this.getOrganization)
            .delete(AuthMiddleware.check, this.deleteOrganization);
        this.router.get("/:id/users", this.getMembers);
        this.router.route("/:id/users/:username")
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
                    username: req.username
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
        await ((await appDataSource)
                .manager
                .save(newOrganization)
        );

        const belongs = new Belongs();
        belongs.isAdmin = true;
        belongs.user = user;
        belongs.organization = newOrganization;

        await ((await appDataSource)
                .manager
                .save(belongs)
        );

        res.status(200).json(newOrganization);
    }

    private async getOrganization(req: Request, res: Response) {
        const org = await ((await appDataSource)
            .manager
            .findOneBy(Organization, {
                id: req.params.id
            })
        );

        res.status(200).json(org);
    }

    private deleteOrganization() {

    }

    private async getMembers(req: Request, res: Response) {
        const members = await ((await appDataSource)
            .getRepository(User)
            .createQueryBuilder('users')
            .leftJoin('belongs', 'b', 'b.username = users.username')
            .where("b.id = :id", {id: req.params.id})
            .leftJoinAndSelect('organization', 'organization', 'organization.id = b.id')
            .getMany()
        );

        res.status(200).json(members);
    }

    private async addMember(req: Request, res: Response) {
        const belongs = new Belongs();
        belongs.userId = req.params.username;
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