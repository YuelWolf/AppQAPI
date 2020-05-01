import {Schema, model, Document} from 'mongoose'
import mongoose from "mongoose";
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
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});


export type UserDocument = Document & {
    name: string
    email: string
    password: string
    encryptPassword: (password: string) => string;
    matchPassword:comparePasswordFunction;
}

//Types
//type matchPasswordFunction = (matchPassword:(password: string)=>{})=> boolean
type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;

//Methods
UserSchema.methods.encryptPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt);
}

/*UserSchema.methods.matchPassword =  async function(password: string){    
     return await bcrypt.compare(password, this.password )
}*/

const comparePassword: comparePasswordFunction = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
        cb(err, isMatch);
    });
};

UserSchema.methods.comparePassword = comparePassword;


export const User = model<UserDocument>('User', UserSchema);