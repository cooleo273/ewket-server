const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

connectDb();

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;
app.use(bodyParser.json());

app.use("/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
