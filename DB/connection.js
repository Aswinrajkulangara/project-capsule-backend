// import mongoose
const mongoose=require('mongoose')

// get the connection string

const connectionString=process.env.DATABASE
//  connect node.js with mongodb 

mongoose.connect(connectionString).then(()=>{
    console.log(" mongodb connection succesfully");
}).catch((err)=>{
    console.log(`mongodb connection failed due to ${err}`);
})