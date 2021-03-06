import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import passport from 'passport'
import passportMiddleware from './middlewares/passport'


//Routes
import userRoutes from './routes/user'
import authRoutes from './routes/auth.routes'
import specialRoutes from './routes/special.routes'
 

class Application {
    app: express.Application;

    constructor(){
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings(){
        this.app.set('port', 4000);
    }

    middlewares(){
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        passport.use(passportMiddleware);
    }

    routes(){
        this.app.use('/user',userRoutes);
        this.app.use('/auth',authRoutes);
        this.app.use('/special', specialRoutes);
    }

    start(){
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port ', this.app.get('port'));        
        })
    }
}

export default Application;