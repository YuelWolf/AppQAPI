import mongoose, {Schema, model} from 'mongoose'

export interface User extends mongoose.Document {
    name: string
    email: string
    password: string
}

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
})

export default model<User>('User', UserSchema)