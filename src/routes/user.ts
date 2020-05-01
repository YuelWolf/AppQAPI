import { Router, Request, Response } from 'express'
import {userCtrl} from '../controllers/user.controller'
import {IUser} from '../models/user'
//import passport from '../config/passport'

const router: Router = Router();
/*
router.route('/login')
    .post(passport.authenticate('local', (err: Error, user: UserDocument) => {
        if (err) { return (err); }
        if (!user) {
            return {'status':'no hay usuario'};
        }else{
            return {'status':'usuario logeado'}
        }
}));

router.route('/create')
    .post((req: Request, res:Response) => {
        userCtrl.createUser(req, res)
    })*/


export default router