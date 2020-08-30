import express from 'express'
import bodyParser from 'body-parser'
import axios  from 'axios'

const app = express()
app.use(bodyParser.json())

app.post('/events', async (req, res) => {
    const { type, data } = req.body;
  
    if (type === 'CommentCreated') {
      const status = data.content.includes('orange') ? 'rejected' : 'approved';
  
      await axios.post('http://localhost:5002/events', {
        type: 'CommentModerated',
        data: {
          id: data.id,
          postId: data.postId,
          status,
          content: data.content
        }
      });
    }
  
    res.send({});
  });

  
const PORT = process.env.PORT || 5005

app.listen(PORT , ()=>{
    console.log(`Moderation service started.\nListening to port ${PORT}`)
 })
 
 