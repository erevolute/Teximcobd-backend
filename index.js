const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000 ;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const ObjectId = require('mongodb').ObjectId;
const fileUpload = require('express-fileupload')

const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

app.use(cors());
app.use(express.json())
app.use(fileUpload())

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.is333.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



// const emailSenderOptions = {
//     auth: {
//       api_key: process.env.EMAIL_KEY
//     }
//   }
  
// const emailClient = nodemailer.createTransport(smtpTransport(emailSenderOptions));
  

// const sendEmail = ({email , name , message})=>{

//     const mailOptions = {
//         from: email ,
//         to: 'ahadxx99@gmail.com',
//         subject: `${name} Sending Email using Node.js[nodemailer]`,
//         text: message,
//         html : ''
//       };

//         console.log("aa", email, name , message)

//       emailClient.sendMail(mailOptions, function(error, info){
//         if (error) {
//           console.log(error);
//         } else {
//           console.log('Email sent: ' + info.response);
//         }
//       }); 

// }
    

async function run() {
    try {
      await client.connect();
      const portfolioCollection = client.db("eRevolute").collection('portfolioCollection');
      const blogsCollection = client.db("eRevolute").collection('blogsCollection');
      const contactCollection = client.db("eRevolute").collection('contactCollection');

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

     app.post('/contact-collection', async(req,res)=>{
        const email = req.body.email;
        const name = req.body.name;
        const message = req.body.message;
        const image = req.files.img;
        const imageData = image.data;
        const encodedImage = imageData.toString('base64')
        const imgBuffer = Buffer.from(encodedImage , 'base64')

        const query = {
            email : email,
            name : name ,
            message : message,
            image : imgBuffer
        }
        // sendEmail(query)
        const result = await contactCollection.insertOne(query)
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