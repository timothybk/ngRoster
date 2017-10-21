var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var NightdutySchema = Schema({
  firefighter: {type: Schema.ObjectId, ref: 'FireFighter'},
  date: Date,
  type: String
});

module.exports = mongoose.model('Nightduty', NightdutySchema);
