var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/peopleDB');

var Schema = mongoose.Schema;

var personSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: String,
    age: { type: Number, min: 10 },
});

var Person = mongoose.model('Person', personSchema);

// var david = new Person({ firstName: 'David', lastName: 'Smith', age: 25 });
// david.save();

// var Aaron = new Person({ firstName: 'Aaron', lastName: 'Smith', age: 26 });
// Aaron.save();

// var noa = new Person({ firstName: 'Noa', lastName: 'vish', age: 29 });
// noa.save();

var boby = new Person({fisrName: 'boby', lastName: "Cohen", age: 9});
boby.save();

// mongoose.connect('mongodb://localhost/beersDB');

// var Schema = mongoose.Schema;

// var beerSchema = new Schema({
//     name: String,
//     abv: Number,
//     style: String
// });

// var Beer = mongoose.model('Beer', beerSchema, 'Beers');

// var goldstar = new Beer({ name: 'goldstar', abv: 5, style: 'light'});
// goldstar.save();

// Person.find({firstName: 'Aaron'}, function (error, result) {
//     if (error) { return console.error(error); }
//     console.log(result);
// })

Person.find({age: 25}, function(error, result) {
    if (error) { return console.error(error);}
    console.log(result);
});

// Person.save(function(error, data) {
//     if (error) { return console.error(error);}
//     console.log(data);
// });

Person.findById('5a5b53dc769f2c2a649da5fe', function(err, person) {
    if (err) throw err; // or if you want console.error(err)
    console.log(person); //otherwise show the result, if any
  });

//   Person.findOneAndUpdate({ age: 25 }, { firstName: 'Paul' }, function(err, person) {
//     if (err) throw err;
//     else console.log(person);
//   });

Person.findOneAndUpdate({ age: 25 }, { firstName: 'Paul' }, {new: true}, function(err, person) {
    if (err) throw err;
    else console.log(person);
  });

  Person.findOneAndRemove({ firstName: 'Noa' }, function(err) {
    if (err) throw err;
  
    // we have deleted the person
    console.log('Person deleted!');
  });