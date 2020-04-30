import { Router, Request, Response } from 'express'
import {userCtrl} from '../controllers/userController'
import passport from '../config/passport'

const router: Router = Router();

//Model
import User from "../models/user"

router.route('/login')
    .post(passport.authenticate('local'))

router.route('/create')
    .post((req: Request, res:Response) => {
        userCtrl.createUser(req, res)
    })


export default router