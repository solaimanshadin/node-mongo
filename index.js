const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
require('dotenv').config()


// const dbUser = process.env.DB_USER;
// const dbPass = process.env.DB_PASS;
// const port = process.env.PORT;
const uri = process.env.PATH;
let client = new MongoClient(uri, {useNewUrlParser:true,useUnifiedTopology: true});

app.use(cors());
app.use(bodyParser.json());

app.post('/adduser' , (req,res) => {
    // console.log(req.body);
    const user = req.body;
    const userId = 55;
    client.connect(err => {
        client = new MongoClient(uri, {useNewUrlParser:true,useUnifiedTopology: true});

        const collection = client.db("onlineStore").collection('products');
        collection.insertOne(user, (err,rej) =>{
            if(err){
                console.log(err)
                res.status(500).send({message:err})
            }else{
                
                res.send(rej.ops[0])
            }
            console.log("Data inserted Successfully" , rej)
            client.close()
        })
    })
});

app.get("/products", (req,res) => {
        client = new MongoClient(uri, {useNewUrlParser:true});

        client.connect(err=> {
        const collection = client.db("onlineStore").collection('products');
        collection.find({name:"Iphone 11 pro"}).limit(5).toArray((err, documents) => {
            if(err){
                console.log(err)
            }else{
                res.send(documents);
            }
            client.close()
        });

    })
    
})
const users = ['Shadin' , 'Mazlan' , 'Mamun' , 'Jahid']
app.get('/' , (req,res) => {
    res.send(users)
})

app.get('/fruits/banana', (req,res)=> res.send({name:'Banana' , quantity: 12, price : 40}) )
app.get('/about', (req,res)=> res.send("Responding  from About page"))

//Post route

app.get('/users/:id', (req,res) => {
    const userId = req.params.id;
    const name = users[userId];
    const query = req.query.sort;
    res.send({userId,name , query})
})
app.listen(port, ()=> console.log("Listing to port 2020"))