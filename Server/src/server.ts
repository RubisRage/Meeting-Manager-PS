
import express, {Request, Response} from 'express';
import UserController from "./controllers/UserController";
import OrganizationController from "./controllers/OrganizationController";
import CommissionController from "./controllers/CommissionController";

const cors = require("cors");

class Server{
    private app: express.Application;
    private PORT: string | number;
    private userController: UserController;
    private organizationController: OrganizationController;
    private commissionController: CommissionController;

    constructor(){
        this.app = express();
        this.app.use(cors());
        this.PORT = process.env.PORT || 8080;
        this.userController = new UserController();
        this.organizationController = new OrganizationController();
        this.commissionController = new CommissionController()
        this.routes();
    }

    private routes(){
        this.app.use('/users/', this.userController.getRouter());
        this.app.use('/organizations/', this.organizationController.getRouter());
        //this.app.use('/api/commissions/', this.commissionController.getRouter());
        this.app.get('/', (req: Request, res: Response) => res.sendStatus(200));
    }

    public start(){
        this.app.listen(this.PORT, () =>{
            console.log(`Application listening on port ${this.PORT}`);
        });
    }
}

const server = new Server;
server.start();