import { Request, Response, Express } from "express";
import express from 'express'
import  env  from "dotenv";
import { customErrorHandler, DefaultErrorHandler } from "./middleware/errorHandles.js";
import router from "./routes/Customer.js";
import AppDataSource from "./db/dbConfig.js";



const app: Express = express();




app.use(express.json())

const PORT = process.env.PORT || 5000;
env.config();
app.get("/", (req: Request, res: Response) => {
    res.send("hello world");
})
app.use("/customer", router);
app.use(customErrorHandler)

app.use(DefaultErrorHandler)
AppDataSource.initialize().then(() => {
    console.log("connected to DB");
}).catch(err => {
    console.error('Failed to connect to DB: ' + err);
});
app.listen(PORT, () => {

    console.log(`the server is running on: http://localhost:${PORT}`)
});

export default app
