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
        const connection = await appDataSource;
        const {name, description, imgURL} = req.body;

        if(name === undefined || description === undefined || imgURL === undefined) {
            res.status(400).json({message: "Bad request, bad format!"});
            return;
        }

        const user = await connection
            .manager
            .findOneBy(User, {
                userId: req.userId
            })


        if(!user) {
            res.status(400).json({message: "Bad request, user not found!"});
            return;
        }

        const newOrganization = new Organization();
        newOrganization.name = name;
        newOrganization.description = description;
        newOrganization.imgURL = imgURL;

        try {
            await connection
                .manager
                .save(newOrganization)
        } catch(err) {
            console.log(err)
        }

        const belongs = new Belongs();
        belongs.isAdmin = true;
        belongs.user = user;
        belongs.organization = newOrganization;

        try {
            await connection
                .manager
                .save(belongs)
        } catch(err) {
            console.log(err);
        }

        res.status(200).json(newOrganization);
    }

    private async getOrganization(req: Request, res: Response) {
        const connection = await appDataSource;
        
        try {
            const belongsEntry = await connection
                .createQueryBuilder(Belongs, 'b')
                .leftJoinAndSelect('organization', 'org', 'org.id = b.id' )
                .leftJoinAndSelect('users', 'u', 'u.userId = b.userId')
                .where('u.username = :username', {username: req.params.username})
                .andWhere('b.id = :id', {id: req.params.id})
                .getOneOrFail()

            const org = await connection
                .manager
                .findOneBy(Organization, {
                    id: belongsEntry.id
                })

            const resBody: any = {...org};
            resBody.isAdmin = belongsEntry.isAdmin;

            res.status(200).json(resBody);
        } catch(err) {
            console.log(err);
            res.status(404).json({message: "Specified user does not exist!"})
        }
    }

    private async deleteOrganization(req: Request, res: Response) {
        const connection = await appDataSource;

        const admin = await connection
            .getRepository(Belongs)
            .createQueryBuilder('b')
            .where('b.id = :id', {id: req.params.id})
            .andWhere('b.isAdmin = TRUE')
            .getOne();

        if(!admin){
            res.status(500).json({message: "Server error."})
            return;
        }

        if(admin.userId === req.userId) {
            await connection
                .getRepository(Organization)
                .createQueryBuilder()
                .delete()
                .where('organization.id = :id', {id: req.params.id})
                .execute();

            res.status(200).json({message: "Organization deleted succesfully!"});
        } else {
            res.status(403).json({message: "Permission denied."});
        }

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
        const connection = await appDataSource;
        
        const newMember = await connection
            .manager
            .findOneBy(User, {
                username: req.params.username
            })

        if(!newMember) {
            res.status(404).json({message: "Specified user does not exist"})
            return;
        }

        const belongs = new Belongs();
        belongs.userId = newMember.userId;
        belongs.id = req.params.id;
        belongs.isAdmin = false;

        await connection
            .manager.save(belongs)

        res.status(200).json({message: "User added to organization successfully!"});
    }

    private async removeMember(req: Request, res: Response) {
        const connection = await appDataSource;

        const requesterBelongEntry = await connection
                .getRepository(Belongs)
                .createQueryBuilder('b')
                .where('b.userId = :userId', {userId: req.userId})
                .andWhere('b.isAdmin = TRUE')
                .getOne();

        if(!requesterBelongEntry) {
            res.status(400).json({
                message: "Bad request, requester does not have permission to do this operation!"
            });

            return;
        }

        const entryToBeRemoved = await connection
                .getRepository(Belongs)
                .createQueryBuilder('b')
                .leftJoinAndSelect('users', 'u', 'b.userId = u.userId')
                .where('b.id = :id', {id: req.params.id})
                .andWhere('u.username = :username', {username: req.params.username})
                .andWhere('b.isAdmin = FALSE')
                .getOne();

        if(!entryToBeRemoved) {
            res.status(404).json({
                message: "The specified user does not exist, does not belong to the specified organization " +
                    "or is the administrator of the specified organization"
            });

            return;
        }

        await connection.getRepository(Belongs).remove(entryToBeRemoved);

        res.status(200).json({message: "User removed from organization!"})
    }

    private async updateAdmin(req: Request, res: Response) {
        const connection = await appDataSource;

        const originalAdmin = await connection
            .getRepository(Belongs)
            .createQueryBuilder('b')
            .where('b.id = :id', {id: req.params.id})
            .andWhere('b.isAdmin = TRUE')
            .andWhere('b.userId = :userId', {userId: req.userId})
            .getOne();

        if(!originalAdmin) {
            res.status(403).json({
                message: "Requester is not admin of the specified organization!"
            })

            return;
        }

        const newAdmin = await connection
            .getRepository(Belongs)
            .createQueryBuilder('b')
            .leftJoinAndSelect('users', 'u', 'b.userId = u.userId')
            .where('b.id = :id', {id: req.params.id})
            .andWhere('u.username = :username', {username: req.params.username})
            .getOne()

        if(!newAdmin) {
            res.status(404).json({
                message: "Specified user does not belong to the specified organization!"
            })

            return;
        }

        originalAdmin.isAdmin = false;
        newAdmin.isAdmin = true;

        connection.manager.save(originalAdmin);
        connection.manager.save(newAdmin);

        res.status(200).json({message: "Administrator updated succesfully!"})
    }
}

export default OrganizationController;