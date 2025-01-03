import { MongoClient } from "mongodb"
import  bcrypt  from 'bcrypt';

export async function POST(params) {
    const data = await params.json()
    const fullname = data.fullname
    const username = data.username
    const password = data.password


    
     const url='mongodb://localhost:27017'
        const database='next-app'
    
        try{
             const client = await MongoClient.connect(url,{useNewURLParser:true,useUnifiedTopology:true})
            const db = client.db(database)
            const userCollection = db.collection("users")

            const existing = await userCollection.findOne({username})
            if(existing){
                return new Response(JSON.stringify({ status: false, message: "User already exists" }),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

            }

            const salRounds = 10
            const hashPassword = await bcrypt.hash(password,salRounds)
            const newUser = {
                fullname,username,password:hashPassword,
                createdAt:new Date()
            }
            const result = await userCollection.insertOne(newUser)
            client.close()
            return new Response(JSON.stringify({ status: true, message: "User Registerd Securely" }),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
    
        }
        catch(error){
            return new Response(JSON.stringify({ status: true, message: "Internal Server Error" }),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })}

}