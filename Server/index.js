const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use("/auth", require("./routes/jwtAuth"));
app.use("/dashboard", require("./routes/dashboard"));

app.listen(5000, () => {
  console.log("Server is starting on PORT:5000");
});
