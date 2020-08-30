import express from 'express'
import  bodyParser  from 'body-parser'
import  cors from 'cors'

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handelEvents = (type,data) =>{
  if (type === 'PostCreated') {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId } = data;

    const post = posts[postId];
    post.comments.push({ id, content });
  }

  if (type === 'CommentUpdated'){
    const {id,contet,postId,status} = data

    const post = posts[postId] 
    const comment = post.comments.find(comment =>{
      return comment.id =  id
    })

    comment.status = status
    comment.content = content

  }

}


app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  handelEvents(type,data);

  console.log(posts);

  res.send({});
});


const PORT = process.env.PORT || 5003

app.listen(PORT ,async ()=>{
   console.log(`Query service started.\nListening to port ${PORT}`)

  const res =  await axios.get('http://localhosts:5002/events');
  
  for(let event of res.data){
    console.log('Processing event:',event.type)

    handelEvents(event.type,event.data)
  }

})

