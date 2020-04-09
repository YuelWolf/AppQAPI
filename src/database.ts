import mongoose from 'mongoose';

async function connect(){
    try {
        mongoose.connect('mongodb://localhost/satyrium',{
            useNewUrlParser: true
        })
    } catch (error) {
        console.log('Error');
        
    }
}

export default connect;