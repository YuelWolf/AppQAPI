import { Request, Response } from 'express';
import User from '../models/user'


class UserCtrl{

    public async login (req:Request, res: Response)  {
        const user = await User.findOne({email: req.params.email})
        if (user) {
            if (user.password == req.params.password) {
                res.json({
                'status': 'ok',
                user
                })
            } else {
                res.json({
                'status': 'Clave invalida'
                })
            }
            } else {
            res.json({
                'status': 'El usuario no existe'
            })
        }    
    }

}
export const userCtrl = new UserCtrl()