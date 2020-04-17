import { Router, Request, Response } from 'express'
import {userCtrl} from '../controllers/userController'

const router: Router = Router();

//Model
import User from "../models/user"

router.route('/login/:usuario/:password')
    .get((req: Request, res: Response) => {
        userCtrl.login
    })

export default router