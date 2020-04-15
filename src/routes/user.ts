import { Router, Request, Response } from 'express';

const router = Router();

//Model
import User from "../models/user";

router.route('/create')
    .get((req: Request, res: Response) => {
        res.send('received')
    })
    .post((req:Request, res:Response)=> {
        const {name, email, password} = req.body
        
    })

export default router;