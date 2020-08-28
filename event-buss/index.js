import express from 'express'
import bodyParser from 'body-parser'
import  axios from 'axios'

const app = express();
app.use(bodyParser.json());

app.post('/events', (req, res) => {
  const event = req.body;

  axios.post('http://localhost:5000/events', event);
  axios.post('http://localhost:5001/events', event);
  axios.post('http://localhost:5003/events', event);

  res.send({ status: 'OK' });
});

const PORT = process.env.PORT || 5002

app.listen(PORT , ()=>{
    console.log(`Listening to port ${PORT}`)
 })
 
 