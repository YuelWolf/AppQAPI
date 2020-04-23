import { Request, Response } from 'express';
import UserModel from '../models/user'


class UserCtrl{
        
    public async login (req:Request, res: Response)  { 
        const user = await UserModel.findOne({email: req.params.email})
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

    public async createUser(req:Request, res: Response) {
        const usuarioExistente = await UserModel.findOne({ email: req.params.email })
        const user = new UserModel({
          name: req.body.name.trim(),
          email: req.body.email.trim(),
          password: req.body.password
        })
        const {confirm_password} = req.body;
        if (usuarioExistente) res.json({ 'status': 'el usuario ya existe' });
        else if(user.password != confirm_password) res.json({'status': 'password no coincide'});
        else if(user.password.length < 4) res.json({'status':'password muy corta'})
        else {
            await user.save((err) => {
            if (err) res.json({ 'status': 'Información faltante o erronea' })
            else res.json({ 'status': 'usuario creado' })
          })
        }
      }
      
      public async updateUser(req:Request, res: Response) {
        const currentUser = await UserModel.findById(req.params.id)
        if(currentUser){
            const user = {
              name: (req.body.name) ? req.body.name.trim() : currentUser.name,
              email: (req.body.email) ? req.body.email.trim() : currentUser.email,
              password: (req.body.password) ? req.body.password.trim() : currentUser.password
            }
            await UserModel.findByIdAndUpdate(req.params.id, { $set: user }, (err) => {
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
        await UserModel.findByIdAndRemove(req.params.id, (err) => {
          if (err) res.json({ 'status': 'Error al eliminar' })
        })
        res.json({
          'status': 'Usuario eliminado'
        })
      }
      
      

}
export const userCtrl = new UserCtrl()