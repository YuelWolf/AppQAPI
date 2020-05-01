import passport from 'passport';
import passportLocal from 'passport-local';
import {Request, Response, NextFunction} from 'express';
import {User, UserDocument} from '../models/user';

const LocalStrategy = passportLocal.Strategy;

passport.use(new LocalStrategy({
    usernameField: 'email'
}, (email, password, done) =>{
    // Match email's user
    const user =  User.findOne({email: email.toLowerCase()})
    console.log(user);
    
    if (!user) {
        return done(null, false, {message: 'No se ha encontrado el usuario'})
    } else {
        //Match password's user
        const match =  user.matchPassword(password)
        console.log(match);        
        if (match) {
            return done(null,true, user);
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

export default passport;