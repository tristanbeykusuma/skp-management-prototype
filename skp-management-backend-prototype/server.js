var express = require('express');
const cors = require('cors');
const path = require('path');
const Routes = require("./routes");

app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use("/", Routes);

app.listen(8080, () => {
console.log ("app is listening on port:", 8080);
})