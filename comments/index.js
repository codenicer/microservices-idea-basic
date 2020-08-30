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

    const comments = commentsByPostId[req.params.id] || []
    
    comments.push({ id: commentId, content, status: 'pending' });

    commentsByPostId[req.params.id] = comments;

    console.log({commentId,content})

    await axios.post('http://localhost:5002/events', {
        type: 'CommentCreated',
        data: {
          id: commentId,
          content,
          postId: req.params.id,
          status:"pending"
        }
      });

    res.status(201).send(comments)
})

app.post('/events',async (req, res) => {
    console.log('Event Received:', req.body.type);
    const { type, data } = req.body;

    console.log(data)
    if (type === 'CommentModerated') {
      const { postId, id, status, content } = data;
      const comments = commentsByPostId[postId];

      const comment = comments.find(comment => {
        return comment.id === id;
      });
      comment.status = status;
      console.log(status)

      await axios.post('http://localhost:5002/events', {
        type: 'CommentUpdated',
        data: {
          id,
          status,
          postId,
          content
        }
      })
    }
    
    res.send({})
});

const PORT = process.env.PORT || 5001

app.listen(PORT , ()=>{
   console.log(`Comment service started.\nListening to port ${PORT}`)
})

