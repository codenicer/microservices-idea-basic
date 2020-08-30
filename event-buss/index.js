import express from 'express'
import bodyParser from 'body-parser'
import  axios from 'axios'

const app = express();
app.use(bodyParser.json());

const events = []

app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event)

  axios.post('http://localhost:5000/events', event);
  axios.post('http://localhost:5001/events', event);
  axios.post('http://localhost:5003/events', event);
  axios.post('http://localhost:5005/events', event);

  res.send({ status: 'OK' });
});

app.get('/events',(req,res)=>{
   res.send(events)
})

const PORT = process.env.PORT || 5002

app.listen(PORT , ()=>{
    console.log(`Event bus service started.\nListening to port ${PORT}`)
 })
 
 