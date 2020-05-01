import {Router} from 'express'
import {userCtrl} from '../controllers/user.controller'
const router = Router();

router.post('/signup', userCtrl.singUp)
router.post('/signin', userCtrl.singIn)

export default router;
