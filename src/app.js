const express = require('express')
const app = express()

app.use('/test',(req,res)=> {
    res.send('welcome to nodejs ');
})
app.use((req,res)=> {
    res.send('welcome to nodejs ');
})
app.listen(4000,()=>{
    console.log('server is running successfully ...')
})
