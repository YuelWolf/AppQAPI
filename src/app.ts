import express from 'express'
import morgan from 'morgan'


//Routes
import indexRoutes from './routes'
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
        this.app.set('port', 3000)
    }

    middlewares(){
        this.app.use(morgan('dev'))
    }

    routes(){
        this.app.use(indexRoutes)
        this.app.use(userRoutes)
    }

    start(){
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port ', this.app.get('port'))         
        })
    }


}

export default Application