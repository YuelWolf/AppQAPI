import {Schema, model} from 'mongoose'

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

export default model('User', UserSchema)