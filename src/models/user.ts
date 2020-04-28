import {Schema, model, Document} from 'mongoose'
import bcrypt from 'bcryptjs'

//Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

//Interface
interface IUserSchema extends Document {
    name: string
    email: string
    password: string
    encryptPassword(password: string) : string;
    matchPassword(password: string): string;
}

//Methods
UserSchema.methods.encryptPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt);
};

UserSchema.methods.matchPassword =  function(password: string){
     bcrypt.compare(password, this.password )
};

export default model<IUserSchema>('User', UserSchema);