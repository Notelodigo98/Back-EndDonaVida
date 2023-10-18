const express =require('express');
const conectarDB= require('./config/DB');
const cors =require("cors");
const app=express();

const PORT = process.env.PORT || 5000;



conectarDB();
app.use(cors());
app.use(express.json());

app.use('/api/donante', require('./routes/donante'));


app.listen(PORT, ()=>{
    console.log('El servidor esta corriendo perfectamente');
})