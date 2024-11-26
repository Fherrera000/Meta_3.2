const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());
app.use(express.json());
const router = require('./routes');
app.use(router);
const port = 4000;
app.listen(port, ()=> {
  console.log(`Server en puerto ${port}`);
  
});
