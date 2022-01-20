const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/quotes', (req, res) => {
    console.log('Hellooooooooooooooooo!')
})

app.listen(process.env.PORT || 5000, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server started at PORT ${PORT}`);
  }
});
