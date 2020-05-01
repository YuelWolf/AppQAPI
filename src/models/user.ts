import {Schema, model, Document} from 'mongoose'
import bcrypt from 'bcryptjs'

//Schema
const userSchema = new Schema({
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

//Interface
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    comparePassword: (password: string) => Promise<Boolean>;
}

//Pre
userSchema.pre<IUser>('save', async function(next){
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password,salt);
    this.password = hash;
    next();
})

userSchema.pre<IUser>('update', async function(next){
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password,salt);
    this.password = hash;
    next();
})

//Methods
userSchema.methods.comparePassword =  async function(password: string): Promise<boolean>{    
     return await bcrypt.compare(password, this.password )
};

export default model<IUser>('User', userSchema);