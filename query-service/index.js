import express from 'express'
import  bodyParser  from 'body-parser'
import  cors from 'cors'
import axios from 'axios'

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handelEvents = (type,data) =>{
  console.log(type)
  if (type === 'PostCreated') {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId,status } = data;

    const post = posts[postId];
    post.comments.push({ id, content ,status});
  }

  if (type === 'CommentUpdated'){
    
   
    const {id,content,postId,status} = data

    const post = posts[postId] 
    const comment = post.comments.find(comment =>{
      return comment.id ===  id
    })

    
    console.log("COMMENT HERE",comment)

    comment.status = status
    comment.content = content
  }

}


app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;
 
  console.log('Processing event:',type)
  handelEvents(type,data);

  res.send({});
});


const PORT = process.env.PORT || 5003

app.listen(PORT ,async ()=>{
   console.log(`Query service started.\nListening to port ${PORT}`)
  try {
    const res =  await axios.get('http://localhost:5002/events');
    console.log('Missed events',res.data)
    for(let event of res.data){
      console.log('Processing event:',event.type)
      handelEvents(event.type,event.data)
    }
    
  } catch (error) {
    console.log(error.message)
  }
 

})

