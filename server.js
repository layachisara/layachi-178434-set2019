// require express, for routing, and body parser, for form parsing
let express = require('express'),
    bodyParser = require('body-parser');

// connect to db models
let db = require('./Treno');
let db = require('./Città');
let db = require('./Orario');

// make a new express app named "app".
let app = express();

// Body parser and encoding setup.
app.use(bodyParser.urlencoded({
    extended: true
}));

// get all
app.get('/api/treni', (req, res) => {
  db.Treno.find((err, allTreni) => {
    if (err) {
      console.log(`index error: ${err}`);
    } else {
      res.json({
        treni: allTreni
      });
    }
  });
});

// get one
app.get('/api/treni/:id', (req, res) => {
  db.Treno.findOne({
    _id: req.params.id
  }, (err, treno) => {
    if (err) {
      console.log(`show error: ${err}`);
    }
    res.json(treno);
  });
});

// create new
app.post('/api/treni', (req, res) => {
  let newTreni = new db.Treno(req.body);
  newTreni.save((err, treno) => {
    if (err) {
      console.log(`save error: ${err}`);
    }
    console.log(`saved new treno: ${treno.name}`);
    res.json(treno);
  });
});

// delete one
app.delete('/api/treni/:id', (req, res) => {
  let trenoId = req.params.id;
  db.Treno.findOneAndRemove({
    _id: trenoId
  })
  .populate('treno')
  .exec((err, deletedTreni) => {
    res.json(deletedTreni);
  });
});

// update one
app.put('/api/treni/:id', (req, res) => {
  let trenoId = req.params.id;
  db.Treno.findOne({
    _id: trenoId
  }, (err, foundTreni) => {
    if (err) {
      console.log('cound not find the treno.')
    }
    foundTreni.name = req.body.name || foundTreni.name;
    foundTreni.from = req.body.from || foundTreni.from;
    foundTreni.to = req.body.to || foundTreni.to;
    foundTreni.OraArrivo = req.body.OraArrivo || foundTreni.OraArrivo;
    foundTreni.OraPartenza = req.body.OraPartenza || foundTreni.OraPartenza;
    
    console.log(`updating: ${foundTreni.name}`);
    //save it
    foundTreni.save((err, treno) => {
      if (err) {
        console.log(`update error: ${err}`);
      }
      console.log(`updated: ${treno.name}`);
      res.json(treno);
    });
  });
});

app.listen(process.env.PORT || 5000, () => {
    console.log('Your API is running on http://localhost:5000/');
});
