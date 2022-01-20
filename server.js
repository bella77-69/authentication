const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;
const MongoClient = require("mongodb").MongoClient;

MongoClient.connect(
  "mongodb+srv://test:test@cluster0.abdec.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useUnifiedTopology: true }
).then((client) => {
  console.log("Connected to Database");

  const db = client.db("star-wars-quotes");

  const quotesCollection = db.collection('quotes');

  app.set('view engine', 'ejs')

  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/', (req, res) => {
    db.collection('quotes').find().toArray()
      .then(results => {
        res.render('index.ejs', { quotes: results })
      })
      .catch(/* ... */)
  })
  
  app.get("/", (req, res) => {
    db.collection('quotes').find().toArray()
    .then(results => {
      console.log(results)
    })
    .catch(error => console.error(error))
  });

  app.post('/quotes', (req, res) => {
    quotesCollection.insertOne(req.body)
      .then(result => {
        res.redirect('/')
      })
      .catch(error => console.error(error))
  });

  app.listen(process.env.PORT || 5000, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log(`Server started at PORT ${PORT}`);
    }
  });
});
