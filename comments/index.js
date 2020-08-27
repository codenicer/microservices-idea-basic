import express from "express"
import bodyParser from 'body-parser'
import {randomBytes} from 'crypto'
import cors from 'cors'


const app = express()
app.use(bodyParser.json())


//in-memory database for testing.
const commentsByPostId = {};


app.get('/post/:id/comments',(req,res)=>{
     res.send(commentsByPostId[req.params.id] || [])
})

app.post('/post/:id/comments',(req,res)=>{
    const commentId = randomBytes(4).toString('hex')
    const {content} = req.body
    const {id} = req.params

    const comments = commentsByPostId[id] || []

    comments.push({
        id:commentId,
        content
    })

    commentsByPostId[id] = comments

    res.status(201).send(comments)
})

const PORT = process.env.PORT || 5001

app.listen(PORT , ()=>{
   console.log(`Listening to port ${PORT}`)
})

