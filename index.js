const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json())

app.get('/' , (req , res)=>{
    res.send('Teximco BD')
})
app.get('/test' , (req , res)=>{
    res.send('test BD')
})

app.listen(port , ()=>{
    console.log('teximco db')
})