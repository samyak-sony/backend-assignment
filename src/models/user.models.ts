import mongoose from "mongoose";

interface UserAttrs {
    _id: mongoose.Schema.Types.ObjectId;
    email:string,
    name: string,
    city: string,
    zipCode:string,
    age: number,
    

}

//interface that describes the properties that a User Model has
// tells typescript that there is a build() available on this User Model

interface UserModel extends  mongoose.Model<UserDoc> {
    build(attrs:UserAttrs): UserDoc;
}

//an interface that describes the properties a User document has

interface UserDoc extends mongoose.Document {
    email:string,
    name: string,
    city: string,
    age: number,
    zipCode:number,
    isDeleted:boolean
}


const userSchema = new mongoose.Schema({
    email: {
        type:String,
        required: true
    },
    name: {
        type:String,
        required: true
    },
    city: {
        type:String,
        required: true
    },
    age: {
        type:Number,
        required: true
    },
    zipCode: {
        type: Number,
        required:true
    },
    isDeleted: {
        type:Boolean,
        default: false
    }
});

// built a function to type check the attributes when making a new user
userSchema.statics.build = (attrs:UserAttrs) => {
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User',userSchema);

export {User};

