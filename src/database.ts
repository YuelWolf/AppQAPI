import mongoose, {ConnectionOptions} from 'mongoose';
import config from './config/config'

const dbOptions: ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

async function connect(){
    try {
        await mongoose.connect(config.DB.URI, dbOptions);
        console.log('>>> Database connected');        
    } catch (error) {
        console.log('Error');        
    }
}

export default connect;