import { app } from "./app";
import mongoose from 'mongoose';

import * as dotenv from 'dotenv';
dotenv.config();
const MONGO_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.kxvhgsf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`


const start = async () => {
    if(!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }


    try{
        await mongoose.connect(MONGO_URL);
        console.log(`Connected to mongoDB`);
    }catch(err){
        console.error(err);
    }

    app.listen(3000,()=>{
        console.log('Listening on port 3000');
    });
    
}
start();

