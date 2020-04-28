import passport from 'passport'
import {Strategy} from 'passport-local'
import User from '../models/user'

passport.use( new Strategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email:string, password:string, done:any) =>{
    // Match email's user
    const user = await User.findOne({email})
    if (!user) {
        return done(null, false, {message: 'No se ha encontrado el usuario'})
    } else {
        //Match password's user
        const match = await user.matchPassword(password)
        if (match) {
            return done(null, user);
        } else {
            return done(null, false, {message: 'Password incorrecta'})
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err,user) => {
        done(err, user);
    })
})