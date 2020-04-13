import mongoose from 'mongoose';

async function connect(){
    try {
        await mongoose.connect('mongodb://localhost/satyrium',{
            useNewUrlParser: true
        });
        console.log('>>> Database connected');
        
    } catch (error) {
        console.log('Error');
        
    }
}

export default connect;