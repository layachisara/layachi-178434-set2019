// set up mongoose
let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let TrenoSchema = new Schema({
  // list model properties
  name: String, //codice treno
  type: String,
  quantity: Number
});

let Treno = mongoose.model('Treno', TrenoSchema);

module.exports = Treno;
