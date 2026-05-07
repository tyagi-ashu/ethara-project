import mongoose from 'mongoose';
import {createRequire} from 'module';
const require = createRequire(import.meta.url);
const passportLocalMongoose = require('passport-local-mongoose').default;
const Schema = mongoose.Schema;
const userSchema= new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type: String, 
        required: true,
        unique:true
    },
    role:{
        type:String,
        required:true,
        enum: ['member', 'admin'],
        default: 'member'
    }
})


userSchema.plugin(passportLocalMongoose)

export default mongoose.model('User',userSchema)