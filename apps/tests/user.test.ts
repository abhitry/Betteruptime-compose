import {describe,it,test,expect}from "bun:test"
import axois from "axios"
import { BACKEND_URL } from "./config"

const USER_NAME=Math.random().toString();

describe("Signup endpoints",()=>{
    it("Isnt able to sign up if body is incoorect",async()=>{
        try{
                await axois.post(`${BACKEND_URL}/user/signup`,{
                email:USER_NAME,
                password:"password"
            });
            expect(false,"Control shouldnt reach here")
        }
        catch(e)
        {
            console.log(e);
        }
    })
    it("Is able to sign up if body is coorect",async()=>{
            const res=await axois.post(`${BACKEND_URL}/user/signup`,{
            username:USER_NAME,
            password:"password"
        })
        expect(res.status).toBe(200);
        expect(res.data.id).toBeDefined();
    })
})


describe("Signin endpoints",()=>{
    it("Isnt able to sign in if body is incoorect",async()=>{
        try{
                await axois.post(`${BACKEND_URL}/user/signin`,{
                email:USER_NAME,
                password:"password"
            });
            expect(false,"Control shouldnt reach here")
        }
        catch(e)
        {
            console.log(e);
        }
    })
    it("Is able to sign in if body is coorect",async()=>{
            const res=await axois.post(`${BACKEND_URL}/user/signin`,{
            username:USER_NAME,
            password:"password"
        })
        expect(res.status).toBe(200);
        expect(res.data.jwt).toBeDefined();
    })
})