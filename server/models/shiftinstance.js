var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ShiftInstanceSchema = Schema({
	date: {type: Date, default: Date.now},
	firefighter: {type: Schema.ObjectId, ref: 'FireFighter'},
	pump: {type: Schema.ObjectId, ref: 'Appliance'},
	shift: String,
	md: Boolean
});

//export model
module.exports = mongoose.model('ShiftInstance', ShiftInstanceSchema);
