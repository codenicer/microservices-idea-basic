import express from "express"
import bodyParser from 'body-parser'
import {randomBytes} from 'crypto'
import cors from 'cors'
import axios from 'axios'


const app = express()
app.use(bodyParser.json())
app.use(cors())


//in-memory database for testing.
const commentsByPostId = {};


app.get('/posts/:id/comments',(req,res)=>{
     res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments',async (req,res)=>{
    const commentId = randomBytes(4).toString('hex')
    const {content} = req.body
    const {id} = req.params

    const comments = commentsByPostId[id] || []

    comments.push({
        id:commentId,
        content
    })

    commentsByPostId[id] = comments

    await axios.post('http://localhost:5002/events', {
        type: 'CommentCreated',
        data: {
          id: commentId,
          content,
          postId:id
        }
      });

    res.status(201).send(comments)
})

app.post('/events', (req, res) => {
    console.log('Event Received:', req.body.type);

    res.send({});
});

const PORT = process.env.PORT || 5001

app.listen(PORT , ()=>{
   console.log(`Listening to port ${PORT}`)
})

