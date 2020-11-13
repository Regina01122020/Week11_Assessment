const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const ejs = require('ejs')
const app = express()
const port = 3000


app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(bodyParser.json())

// IMPORT THE DB SCHEMA
const schema = require('./model/schema.js')

// CONNECTION TO THE DATABASE 
mongoose.connect('mongodb+srv://regina:lJh3MVjYfGtkzJRn@cluster1.utlod.gcp.mongodb.net/Week11Test?retryWrites=true&w=majority', 
{ useNewUrlParser: true, useUnifiedTopology: true },
function(error, database) { 
    if (error) { 
        throw error
    } else {
        console.log("Connection made to database.")
    }
    
}) 

// JUST A TEST GET REQUEST TO CHECK IF THE ROUTES ARE WORKING
app.get('/', function(req, res){
    console.log('Routes are working...')
})

// GET REQUEST TO GET THE FORM
app.get('/patient', function(req, res) {
    schema.find({})
        .then(function(patients) {
            console.log(patients)
            res.send(patients)
        })
        .catch(function(error) {
            console.log(error)
            res.send(error)
        })
})


// POST REQUEST TO POST THE FORM 
app.post('/patient', function(req, res) {
    console.log("Post route hit")
    console.log(req.body)

patientObject = {
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    password: req.body.password,
    physician: req.body.physician
} 
 
addPatient = new schema(patientObject)  

addPatient.save(patientObject) 
    .then(function(patient) {
        console.log("Patient Details Saved!")
        console.log(patient)
        res.send(patient)
    }) 
    .catch(function(error) {
        console.log(error)
    })
}) 

// PATCH REQUEST TO UPDATE AND MODIFY THE FORM
app.patch('/patient/:id', function(req, res) {
    console.log("HITTING the UPDATE route")
    console.log(req.params.id)
    schema.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify: false})
        .then(function(upDate) {
            console.log(upDate)
            res.send(upDate)
        })
        .catch(function(err){
            console.log(err)
            res.send(err)
        })
})

// DELETE REQUEST TO DELETE THE FORM
app.delete('/patient/:id', function(req, res) {
    console.log("DELETE ROUTE hit")
    console.log(req.params.id)
    schema.findByIdAndDelete(req.params.id)
        .then(function(x) {
            console.log(x)
            res.send(x)
        })
        .catch(function(err) {
            console.log(err)
            res.send(err) 
        }) 
    })


// SERVER LISTENING AT THIS PORT
app.listen(port, function(){
    console.log(`Express App running at http://localhost:${port}`)
})