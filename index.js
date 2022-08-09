const express = require('express');
const cors = require('cors');
const contacts = require('./contacts.json');
const app = express();
const PORT_NUMBER = 2000;


app.use(cors())

app.get('/',(req, res) =>{
    res.json({
        message : 'Not Found',
        data:[],
        statusCode: 404
    })
})

app.get('/contacts',(req, res) =>{
    const contactData = [];
    for (let index = 0; index < contacts.length; index++) {
        const contact = contacts[index];
        if(index >= req.query.offset && contactData.length < req.query.limit){
            contactData.push(contact);
        }
    }
    res.json({
        message : 'Success',
        data: req.query.offset && req.query.limit ? contactData : contacts,
        statusCode: 200
    })
})

app.get('/contacts/:id/email_addresses',(req, res) =>{
    const id = req.params.id;
    const contact = contacts.find((contact) => contact.id == id);
    res.json({
        message : 'Success',
        data:contact,
        statusCode: 200
    })
})

app.listen(PORT_NUMBER,()=>{
    console.log("Node sample app");
})