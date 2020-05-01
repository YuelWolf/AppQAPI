import { Request, Response } from 'express';
import User,{IUser} from '../models/user'
import jwt from 'jsonwebtoken';
import config from '../config/config'

function createToken(user:IUser){
  return jwt.sign({id: user.id, email:user.email, name:user.name},config.jwtSecret, {
    expiresIn: 86400
  })
} 

class UserCtrl{ 

  public async singUp (req: Request, res: Response) {
    const errors = [];
    const usuarioExistente = await User.findOne({ email: req.body.email.toLowerCase() });
    if(usuarioExistente) return res.status(400).json({ msg: 'El email ya esta en uso' });
    
    const user = new User({
      name: req.body.name.trim(),
      email: req.body.email.trim(),
      password: req.body.password
    })

    if(user.password != req.body.confirm_password) errors.push({msg: 'Password no coincide'});   
    if(user.password.length <= 4) errors.push({msg:'Password muy corta debe ser mayor a 4'})

    if(errors.length>=1) return res.status(400).json({errors});      
              
    await user.save((err) => {
      if (err) return res.status(400).json({msg: 'Información faltante o erronea'})
      else return res.status(201).json(user)
    })    
  }

  public async singIn (req: Request, res: Response) {
    if(!req.body.email || !req.body.password) return res.status(400).json({msg: 'Por favor envie un email y una password'})

    const user = await User.findOne({ email: req.body.email.toLowerCase() });
    if(!user) return res.status(400).json({msg : 'El usuario no existe'})

    const isMatch = await user.comparePassword(req.body.password)
    if (isMatch) return res.status(200).json({token: createToken(user)})

    return res.status(400).json({msg:'el correo o contraseña son incorrectos'});
 
  }
  
  
  public async updateUser(req:Request, res: Response) {
    const currentUser = await User.findById(req.params.id)
    if(currentUser){
        const user = {
          name: (req.body.name) ? req.body.name.trim() : currentUser.name,
          email: (req.body.email) ? req.body.email.trim() : currentUser.email,
          password: (req.body.password) ? req.body.password.trim() : currentUser.password
        }
        await User.findByIdAndUpdate(req.params.id, { $set: user }, (err) => {
          if (err) res.json({ 'status': 'Error al actualizar' })
        })
        res.json({
          'status': 'Usuario actualizado'
        })
    }
    else {
        res.json({
            'status': 'El usuario no existe'
        })
    }
  }
  
  public async deleteUserModel (req:Request, res: Response){
    await User.findByIdAndRemove(req.params.id, (err) => {
      if (err) res.json({ 'status': 'Error al eliminar' })
    })
    res.json({
      'status': 'Usuario eliminado'
    })
  }
      
}
export const userCtrl = new UserCtrl()