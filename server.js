const express = require("express")
const bodyParser = require('body-parser');
const errorHandler = require ("./middleware/errorHandler")
const connectDb = require("./config/dbConnection")
const dotenv = require("dotenv").config();
connectDb();
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());



app.use("/students", require("./routes/StudentRoutes"))

app.use(errorHandler);
app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
});