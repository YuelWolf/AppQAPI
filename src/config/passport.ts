import passport from 'passport'
import {Strategy} from 'passport-local'
import User from '../models/user'

passport.use(new Strategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email:string, password:string, done:any) =>{
    // Match email's user
    const user = await User.findOne({email})
    console.log(user);
    
    if (!user) {
        return done(null, false, {status: 'No se ha encontrado el usuario'})
    } else {
        //Match password's user
        const match = await user.matchPassword(password)
        console.log(match);
        
        if (match) {
            return done(null,true, user);
        } else {
            return done(null, false, {status: 'Password incorrecta'})
        }
    }
}));

passport.serializeUser((user:any, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err,user) => {
        done(err, user);
    })
});

export default passport;