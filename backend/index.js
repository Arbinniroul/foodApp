const express = require('express');
const cors = require('cors');
const mongoDB = require('./db'); // Import the mongoDB connection function

const app = express();
const port = 9000;

// Connect to MongoDB
mongoDB();

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use((req,res,next)=>{
res.setHeader("Access-Control-Allow-Origin","https://localhost:9000");
res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
);
next();
})
app.use(cors({
    origin: 'http://localhost:9000', 
  }));
app.use(express.json());
app.use('/api',require("./Routes/CreateUser"));
app.use('/api',require("./Routes/DisplayData"));
app.use('/api',require("./Routes/OrderData"));
// Start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
 