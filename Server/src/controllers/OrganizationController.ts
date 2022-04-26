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

    private getOrganization() {

    }

    private deleteOrganization() {

    }

    private getMembers() {

    }

    private addMember() {

    }

    private removeMember() {

    }

    private updateAdmin() {

    }
}

export default OrganizationController;