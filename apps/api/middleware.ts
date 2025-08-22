import type{ Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authmiddleware(req:Request,res:Response,next:NextFunction)
{
    const header=req.headers.authorization!;
    try{
        let data=jwt.verify(header ,process.env.JWT_SECRET!)
        req.userId=data.sub as string;
        next();
    }catch(e)
    {
        res.status(403).send("");
    }

}