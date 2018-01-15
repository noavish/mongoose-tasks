var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/solarDB');

var solarSchema = new mongoose.Schema({
    planets: [{type: Schema.Types.ObjectId, ref: 'planet'}],
    starName: String
});

var Solar = mongoose.model('solar', solarSchema);

var planetSchema = new mongoose.Schema({
    name: String,
    system: {type: Schema.Types.ObjectId, ref: 'solar'},
    visitors: [{type: Schema.Types.ObjectId, ref: 'visitor'}]
});

var Planet = mongoose.model('planet', planetSchema);

var visitorSchema = new mongoose.Schema({
    name: String,
    homePlant: {type: Schema.Types.ObjectId, ref: 'planet'},
    visitedPlanets: [{type: Schema.Types.ObjectId, ref: 'planet'}]
});

var Visitor = mongoose.model('visitor', visitorSchema);

var Solar1 = new Solar({
    planets: [],
    starName: 'solar1'
});

var Mercury = new Planet({
    name: 'Mercury',
    system: Solar1._id,
    visitors: []
});

var Venus = new Planet({
    name: 'Venus',
    system: Solar1._id,
    visitors: []
});

var Noa = new Visitor({
    name: 'noa',
    homePlant: Venus._id,
    visitedPlanets: []
});

var Avi = new Visitor({
    name: 'avi',
    homePlant: Mercury._id,
    visitedPlanets: []    
});

Venus.visitors.push(Noa);
Venus.visitors.push(Avi);
Noa.visitedPlanets.push(Venus);
Solar1.planets.push(Venus);
Solar1.planets.push(Mercury);


// Solar1.save();
// Mercury.save();
// Venus.save();
// Noa.save();
// Avi.save();

// Visitor.find({name: 'noa'}).populate('visitedPlanets').exec(function(err, visitors) {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(visitors[0].visitedPlanets[0].name);
//     }
// });

// Planet.find({name:'Venus'}).populate('visitors', 'name -_id').exec(function(err, planets) {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(planets[0].visitors);
//     }
// })

Solar.find({starName: 'solar1'}).populate({
    path: 'planets',
    populate: {
        path: 'visitors'
    }
}).exec(function(err, solar) {
    if (err) {
        console.error(err);
    } else {
        console.log(solar);
    }
});