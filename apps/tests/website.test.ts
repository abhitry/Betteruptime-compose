import { describe, it, expect, beforeAll } from "bun:test";
import axios from "axios";
import {createUser} from "./testUtils";
import { BACKEND_URL } from "./config";

describe("Website gets created", () => {
    let token:string;
    beforeAll(async()=>{
        const data=await createUser();
        token=data.jwt
    })

    it("Website not created if url is not present", async () => {
        try {
            await axios.post(`${BACKEND_URL}/website`, {
                
            });
            expect(false, "Website created when it shouldnt");
        } catch(e) {

        }

    })

    it("Website is created if url is present", async () => {
        const response = await axios.post(`${BACKEND_URL}/website`, {
            url: "https://www.youtube.com/"
        },{
            headers:{
                Authorization: token
            }
        })
        expect(response.data.id).not.toBeNull();
    })

    it("Website is not created if headers is not present", async () => {
        try{
            const response = await axios.post(`${BACKEND_URL}/website`, {
                url: "https://www.youtube.com/"
            });
            expect(false,"Website shouldnt be created if no auth header");
        }
        catch(e)
        {

        }
    })
})


describe("can fetch website",()=>{
     let token1:string,userId1:string;
     let token2:string,userId2:string;
    beforeAll(async()=>{
        const user1=await createUser();
        const user2=await createUser();
        token1=user1.jwt;
        userId1=user1.id;
        token2=user2.jwt;
        userId2=user2.id;
    })

    it("is able to fetch the website that the user created",async()=>{
        const websiteResponse = await axios.post(`${BACKEND_URL}/website`, {
            url: "https://www.youtube.com/"
        },{
            headers:{
                Authorization: token1
            }
        })
        const getWebsiteResponse=await axios.get(`${BACKEND_URL}/status/${websiteResponse.data.id}`,{    
            headers:{
                Authorization: token1
            }
        })
        expect(getWebsiteResponse.data.id).toBe(websiteResponse.data.id);
        expect(getWebsiteResponse.data.userId).toBe(userId1);
    })

    it("Cant acces webasite created by other user",async()=>{
         const websiteResponse = await axios.post(`${BACKEND_URL}/website`, {
            url: "https://www.youtube.com/"
        },{
            headers:{
                Authorization: token1
            }
        })
        try{
            const getWebsiteResponse=await axios.get(`${BACKEND_URL}/status/${websiteResponse.data.id}`,{    
                headers:{
                    Authorization: token1
                }
            }) 
            expect(false,"Shouldnt be able to accces website of other user");
        }
        catch(e)
        {

        }
        
    })
})
 //docker run -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres

 describe("should be able to get all websites ",()=>{
    let token:string,userId:string;
    beforeAll(async()=>{
        const user=await createUser();
        token=user.jwt;
        userId=user.id;
    })
    it("can fetch its own set of websites",async()=>{
        await axios.post(`${BACKEND_URL}/website`, {
            url: "https://www.youtube.com/"
        },{
            headers:{
                Authorization: token
            }
        })
        await axios.post(`${BACKEND_URL}/website`, {
            url: "https://www.facebook.com/"
        },{
            headers:{
                Authorization: token
            }
        }) 
        const response=await axios.get(`${BACKEND_URL}/websites`,{    
            headers:{
                Authorization: token
            }
        }) 
        expect(response.data.websites.length==2,"incorrect number of websites created");
        
    })
 })