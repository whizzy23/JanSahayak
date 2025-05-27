require('dotenv').config()
const issueRoutes = require('./routes/issues')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

// express app
const app = express();
app.use(cors());

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(result => {
        app.listen(process.env.PORT, () => {
        console.log('Connected to db and listening on port', process.env.PORT)
        })
    })
    .catch(err => console.log( 'Error detected while connecting to database' , err ))

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path , req.method)
  next()
})

// routes
app.get('/api',(req,res) => {
    res.redirect('/api/issues')
})

// issues routes
app.use('/api/issues', issueRoutes);