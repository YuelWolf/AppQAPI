import {Strategy, ExtractJwt, StrategyOptions} from 'passport-jwt';
import config from '../config/config'
import User from '../models/user'

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
}

export default new Strategy(options, async (payload,done)=>{
    try {
        const user = await User.findById(payload.id)
        if (user) {
            return done(null, user);
        }else{
            return done(null, false)
        }        
    } catch (error) {
        console.log(error);        
    }
})

