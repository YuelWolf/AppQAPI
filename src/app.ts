import express from 'express'
import morgan from 'morgan'
import passport from 'passport'


//Routes
import userRoutes from './routes/user'
 

class Application {
    app: express.Application;

    constructor(){
        this.app = express()
        this.settings()
        this.middlewares()
        this.routes()
    }

    settings(){
        this.app.set('port', 4000)
    }

    middlewares(){
        this.app.use(morgan('dev'))
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: false}))
        this.app.use(passport.initialize())
        this.app.use(passport.session())
    }

    routes(){
        this.app.use('/user',userRoutes)
    }

    start(){
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port ', this.app.get('port'))         
        })
    }
}

export default Application