import express from "express";
import { json } from "body-parser"
import cookieSession from "cookie-session";
import { authenticate } from "./middleware/authenthication";
import { getUserRouter } from "./routes/user.routes";

const app = express();


app.use(json());
app.use(
    cookieSession({
    //disable encryption on the cookie
    signed:false,
    
})
);

// //basic authentication middleware to all user endpoints
// app.use('/worko/user', authenticate); 
app.use(getUserRouter);
export {app};