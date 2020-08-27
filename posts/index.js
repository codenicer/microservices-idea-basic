import express from "express"
import bodyParser from 'body-parser'
import {ramdomBytes} from 'crypto'
import cors from 'cors'


const app = express()
app.use(bodyParser.json())
//in memory database for testing.
const post = {};


app.get('/posts',(req,res)=>{
     res.send(post)
})

app.post('/posts',(req,res)=>{
    const id = ramdomBytes(4).toString('hex')
    const {
        title
    } = req.body


    posts[id] = {
        id,title
    }

    res.status(201).send(posts[id])
})

const PORT = process.env.PORT || 5000

app.listen(PORT , ()=>{
   console.log(`Listening to port ${PORT}`)
})

