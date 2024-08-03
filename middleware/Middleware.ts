import express from 'express'
import{ NextFunction} from "express"

import {Request,Response} from "express"
const logreqmiddleware =(req:Request,res:Response,next:NextFunction)=>{
console.log(`${new Date().toLocaleDateString()}-${req.path}-${req.method}-${res.statusCode}`);
next()

}
export {logreqmiddleware}