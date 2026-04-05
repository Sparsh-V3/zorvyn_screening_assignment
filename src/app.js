const express = require("express");
const recordRoutes = require("./routes/recordRoutes")
require("dotenv").config()

const app = express();

app.use(express.json());
app.use("/", recordRoutes)

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`The server is running at port: ${PORT}`);
});
