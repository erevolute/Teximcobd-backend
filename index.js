const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000 ;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const ObjectId = require('mongodb').ObjectId;
const fileUpload = require('express-fileupload')


app.use(cors());
app.use(express.json())
app.use(fileUpload())

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.is333.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
      await client.connect();
      const mediaCollection = client.db("eRevolute").collection('mediaCollection');
      const productCollection = client.db("eRevolute").collection('productCollection');
      const contactCollection = client.db("eRevolute").collection('contactCollection');

     
      
      app.post('/products' , async(req, res)=>{
         const name = req.body.name;
         const date = req.body.date;
         const category = req.body.category;

         const image = req.files.img;
         const imageData = image.data;
         const embedImage = imageData.toString('base64')
         const imgBuffer = Buffer.from(embedImage , 'base64')

         const imageSecond = req.files.imgSecond;
         const imageSecondData = imageSecond.data;
         const embedImageSecond = imageSecondData.toString('base64')
         const imgSecondBuffer = Buffer.from(embedImageSecond , 'base64')

         const query = {
            name : name,
            date : date ,
            category : category,
            image : imgBuffer,
            image2 : imgSecondBuffer
         }
         const result = await productCollection.insertOne(query);
         res.send(result)

      })

      app.get('/products' , async(req, res)=>{
         const query = {}
         const result = await productCollection.find(query).toArray()
         res.send(result)
      })

      app.delete('/products/:id' , async(req, res)=>{
         const id = req.params.id;
         const query = {_id:ObjectId(id)}
         const result = await productCollection.deleteOne(query)
         res.send(result)
      })



     app.delete('/contact-collection/:id' , async(req, res)=>{
        const id = req.params.id;
        const query = {_id:ObjectId(id)}
        const result = await contactCollection.deleteOne(query)
        res.send(result)
     })


     app.get('/contact-collection' , async(req, res)=>{
        const query = {}
        const result = await contactCollection.find(query).toArray()
        res.send(result)
     })

     app.get('/media' , async(req, res)=>{
        const query = {}
        const result = await mediaCollection.find(query).toArray()
        res.send(result)
     })

     app.get('/media/:id' , async(req, res)=>{
        const id = req.params.id;
        const query = { _id:ObjectId(id) }
        const result = await mediaCollection.find(query).toArray()
        res.send(result)
     })


     app.post('/media-video' , async(req, res)=>{
            const query = req.body;
            const result = await mediaCollection.insertOne(query);
            res.send(result)
     })
     app.put('/media-video/:id' , async(req, res)=>{
             const id = req.params.id ;
           const query = {_id:ObjectId(id)}
            const name = req.body.videoReporterName;
            const subject = req.body.videoSubject;
            const catagory = req.body.catagory;
            const date = req.body.date;
            const description = req.body.description;
            const videoLink = req.body.videoLink;
            const options = {upsert : true}
            const updateDoc = {
               $set: {
                  description : description,
                 subject : subject ,
                 name : name,
                 date : date ,
                 videoLink : videoLink,
                 catagory : catagory
               },
             };
             const result = await mediaCollection.updateMany(query, updateDoc, options);
             res.send(result)
         
     })

     app.post('/media-image', async(req,res)=>{
        const subject = req.body.subject;
        const date = req.body.date;
        const name = req.body.name;
        const description = req.body.description;    
        const catagory = req.body.catagory;    
        const image = req.files.img;
        const imageData = image.data;
        const encodedImage = imageData.toString('base64')
        const imgBuffer = Buffer.from(encodedImage , 'base64')

        const query = {
            subject : subject,
            name : name ,
            description : description,
            date : date,
            catagory : catagory,
            image : imgBuffer
        }
       
        const result = await mediaCollection.insertOne(query)
        res.send(result)

     })
     app.delete('/media/:id' , async(req , res)=>{
        const id = req.params.id;
        const query = {_id:ObjectId(id)}
        const result = await mediaCollection.deleteOne(query);
        res.send(result)
     })

     app.patch('/media-image/:id', async(req , res)=>{
      const id = req.params.id ;
      const query = {_id:ObjectId(id)}
      const description = req.body.description;
      const date = req.body.date;
      const image = req.files.img;

      const imgData = image.data;
      const encodedImg = imgData.toString('base64');
      const imgBuffer = Buffer.from(encodedImg , 'base64')
      const options = { upsert: true };
      const updateDoc = {
        $set: {
         image : imgBuffer,
         date : date,
         description : description,
        },
      };
      const result = await mediaCollection.updateMany(query, updateDoc, options);
      res.send(result)
    });

    app.put('/media-image/:id', async(req , res)=>{
      const id = req.params.id ;
      const query = {_id:ObjectId(id)}
      const name = req.body.videoReporterName;
      const subject = req.body.videoSubject;
      const catagory = req.body.catagory;

      const options = { upsert: true };
      const updateDoc = {
        $set: {
         name : name,
         subject : subject ,
         catagory : catagory
        },
      };
      const result = await mediaCollection.updateOne(query, updateDoc, options);
      res.send(result)
    });


    } finally {
        //  await client.close();

       }
     }
run().catch(console.dir);

app.get('/' , (req , res)=>{
    res.send('Teximco BD 5000')
})

app.listen(port , ()=>{
    console.log('teximco db 5000')
})