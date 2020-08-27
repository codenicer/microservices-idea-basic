import express from "express"

const app = express()

app.get('/post',(req,res)=>{
     
})

app.post('/post',(req,res)=>{

})

const PORT = process.env.PORT || 5000

app.listen(PORT , ()=>{
        console.log(`Listening to port ${PORT}`)
})