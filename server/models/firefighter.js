var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FireFighterSchema = Schema({
    number: Number,
    rank: String,
    name: String,
    qualifications: [{type: Schema.ObjectId, ref: 'Qualification'}],
    n2: Date
});

//virtual for ff's full title
FireFighterSchema
    .virtual('fulltitle')
    .get(function() {
        return this.number + ' ' + this.rank + ' ' + this.name;
    })

//virtual for ff's URL
FireFighterSchema
    .virtual('url')
    .get(function() {
        return '/firefighter/' + this._id;
    })

module.exports = mongoose.model('FireFighter', FireFighterSchema);
