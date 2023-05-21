import express from "express";
import jsonwebtoken from "jsonwebtoken"


export const auth = async (req, res, next)=>{
    try{
        const token = req.cookies.access_token;
        if(!token)
        {
            throw new Error("You are not authorised");
        }

        else
        {
            const role = jsonwebtoken.decode(token).role;
            if(role!='admin' && role!='teacher' && role === 'student')
            {
                next();
            }
            else throw new Error("You are not authorised");
        }
    }
    catch(error)
    {
        return res.send({'Error': error.message})
    }
}