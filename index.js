import dotenv from "dotenv";
dotenv.config({path:"config/env/.env"});
import app from "./server/app.js";

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log("Server running on port"+ port);
});