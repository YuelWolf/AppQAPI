import express from 'express';
import morgan from 'morgan';

class Application {
    app: express.Application;

    constructor(){
        this.app = express()
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings(){
        this.app.set('port', 3000)
    }

    middlewares(){
        this.app.use(morgan('dev'));
    }

    routes(){

    }

    start(){
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port ', this.app.get('port'));            
        })
    }


}

export default Application;