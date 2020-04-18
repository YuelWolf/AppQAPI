import { Router, Request, Response } from 'express'
import {userCtrl} from '../controllers/userController'

const router: Router = Router();

//Model
import User from "../models/user"

router.route('/login/:email/:password')
    .get((req: Request, res: Response) => {
        userCtrl.login(req, res)
    })

router.route('/create')
    .post((req: Request, res:Response) => {
        userCtrl.createUser(req, res)
    })

export default router