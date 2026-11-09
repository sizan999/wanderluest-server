import express from 'express'//aita change hobe 
import { MongoClient } from 'mongodb';
import 'dotenv/config';
const app = express()
// var cors = require('cors')
import cors from 'cors'
const port = process.env.PORT

app.use(cors())
app.use (express.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// const client = process.env.MONGODB_URI;
const client = new MongoClient(process.env.MONGODB_URI);

export async function connectToMongoDB() {
  try {
    await client.connect();


    const db = client.db('wanderlast')
    const destinationCollection = db.collection('destinations')

    app.get('/destinations',async(req,res)=>{
        const result = await destinationCollection.find().toArray()
        res.send(result)
    })

    
    app.post('/destination',async (req,res)=>{
          const destinationData = req.body;
          console.log(destinationData)
          const result = await destinationCollection.insertOne(destinationData);
          res.send(result);

    })
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    // console.dir(err);
  }
}

connectToMongoDB()//aita call kora lagbe 

/*
mongodb connect 
import express from 'express'//aita change hobe 
connectToMongoDB()//aita call kora lagbe 
*/