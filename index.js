const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000 ;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

app.use(cors());
app.use(express.json())

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.is333.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

console.log(uri)
async function run() {
    try {
      await client.connect();
      const portfolioCollection = client.db("eRevolute").collection('portfolioCollection');
      const blogsCollection = client.db("eRevolute").collection('blogsCollection');

      app.get('/portfolio' , async(req, res)=>{
        const query = {}
        const result = await portfolioCollection.find(query).toArray()
        res.send(result)
     })
   
     app.get('/blogs' , async(req, res)=>{
        const query = {}
        const result = await blogsCollection.find(query).toArray()
        res.send(result)
     })
  
    } finally {
        //  await client.close();

       }
     }
run().catch(console.dir);
     
     
     

app.get('/' , (req , res)=>{
    res.send('Teximco BD')
})
app.get('/test' , (req , res)=>{
    res.send('test BD')
})

app.listen(port , ()=>{
    console.log('teximco db')
})