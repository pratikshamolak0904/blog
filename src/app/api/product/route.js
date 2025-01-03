import { MongoClient, ObjectId } from "mongodb";

const url = 'mongodb://localhost:27017'
const database = 'next-app'

export async function POST(params) {
    const data = await params.json()
    const fullname = data.fullname
    const username = data.username
    const title = data.title
    const type = data.type
    const content = data.content
    try {
        const client = await MongoClient.connect(url, { useNewURLParser: true, useUnifiedTopology: true })
        const db = client.db(database)
        const blogCollection = db.collection("blogs")

        const newBlog = {
            title, fullname, type, username, content, createdAt: new Date().toLocaleDateString()
        }
        const res = await blogCollection.insertOne(newBlog)
        client.close()
        return new Response(JSON.stringify({ status: true, message: "Blog Inserted !!" }),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
    }
    catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ status: false, message: "Internal Server Error !!" }),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
    }
}
export async function PUT(params) {

    const data = await params.json()
    const { id, title, fullname, type, username, content } = data

    try {
        const client = await MongoClient.connect(url, { useNewURLParser: true, useUnifiedTopology: true })
        const db = client.db(database)
        const blogCollection = db.collection("blogs")

        const res = await blogCollection.updateOne({
            _id: new ObjectId(id)
        }, {
            $set: {
                title, fullname, type, username, content, createdAt: new Date().toLocaleDateString()
            }
        })
        client.close()
        if (res.modifiedCount > 0) {
            return new Response(JSON.stringify({ status: true, message: "Blog Updated !!" }),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

        } else {
            return new Response(JSON.stringify({ status: false, message: "Blog Not Updated !!" }),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
        }

    }
    catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ status: false, message: "Internal Server Error !!" }),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
    }
}

export async function DELETE(params) {
    const data = await params.json()
    const { id } = data

    try {
        const client = await MongoClient.connect(url, { useNewURLParser: true, useUnifiedTopology: true })
        const db = client.db(database)
        const blogCollection = db.collection("blogs")

        const res = await blogCollection.deleteOne({
            _id: new ObjectId(id)
        })
        client.close()
        if (res.deletedCount > 0) {
            return new Response(JSON.stringify({ status: true, message: "Blog Deleted !!" }),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

        } else {
            return new Response(JSON.stringify({ status: false, message: "Blog  Not Not !!" }),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
        }

    }
    catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ status: false, message: "Internal Server Error !!" }),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
    }
}


export async function GET(params) {
    try {
        const client = await MongoClient.connect(url, { useNewURLParser: true, useUnifiedTopology: true })
        const db = client.db(database)
        const blogCollection = db.collection("blogs")

        const res = await blogCollection.find().toArray()
        client.close()
        return new Response(JSON.stringify({ status: true, message: res }),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
    }

    catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ status: false, message: "Internal Server Error !!" }),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
    }
}