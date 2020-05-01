/*import passport from 'passport';
import passportLocal from 'passport-local';
import {Request, Response, NextFunction} from 'express';
import {User} from '../models/user';

const LocalStrategy = passportLocal.Strategy;

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) =>{
    // Match email's user    
    const user =  await User.findOne({email: email.toLowerCase()})    
    if (!user) {
        return done(null, false, {message: 'No se ha encontrado el usuario'})
    } else {
        //Match password's user
        const match =  await user.comparePassword(password)   
        if (match) {
            return done(null,user, {message: 'todo copas'});
        } else {
            return done(null, false, {message: 'Password incorrecta'})
        }
    }
}));

passport.serializeUser<any,any>((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err,user) => {
        done(err, user);
    })
});

export default passport;*/