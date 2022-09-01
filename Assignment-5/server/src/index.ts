const express=require('express');
import indexRoutes from './routes/index';
const app=express();

import cors = require("cors");

app.use(express.json({limit:"30mb"}));
app.use(cors());

app.use(express.urlencoded({extended:false}));

app.use(indexRoutes);
app.listen(2900,()=>{
    console.log('server is running on 2900');
});
