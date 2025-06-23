require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors');
const bp = require("body-parser");
const PORT = process.env.PORT
const router = require("./routes/index")
const swaggerJSON = require('./api-documentation/swagger.json')
const swaggerUI = require('swagger-ui-express')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON))
app.use('/api', router, express.static('public'))

app.get("/", (req, res) => {
  res.send("halo");
  console.log("test");
});

app.listen(PORT, () => {
  console.log(`dengar di ${PORT}`);
});
