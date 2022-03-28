require('dotenv').config();

/** 1) Install & Set up mongoose */
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let Person;

/**Assign Mongoose Schema to a variable */
const Schema = mongoose.Schema;

/**Create Person schema */
const personSchema = new Schema({
  name: { type: String, required: true},
  age: Number,
  favoriteFoods: [String]
});

/**Create Person model from the schema */
Person = mongoose.model("Person", personSchema);

/**Create and save a Person  */
const createAndSavePerson = (done) => {
  var nikoletaDaci = new Person({
    name: "Nikoleta Daci",
    age: 24,
    favoriteFoods: ["cheesecake", "pasta", "fish"]
  });
  nikoletaDaci.save(function(err, data){
    if(err)
      return console.error(err);
      done(null, data);
  });
};

/**Create many People with model.create()*/
var arrayOfPeople = [
  {name: "Ann", age: 25, favoriteFoods: ["pie"]},
  {name: "Andrew", age: 38, favoriteFoods: ["taco"]},
  {name: "Tom", age: 25, favoriteFoods: ["chicken"]}
];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if(err)
      return console.log(err);
      done(null, data);
  });
};

/** 5) Use `Model.find()` */
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, data) => {
    if(err)
      return console.log(err);
      done(null, data);
  });
};

/** 6) Use `Model.findOne()` */
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    if(err)
      return console.log(err);
      done(null, data);
  })
};

/** 7) Use `Model.findById()` */
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if(err)
      return console.log(err);
      done(null, data);
  });
};

/** 8) Find edit than save */
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  /** .findById() method to find a person by _id with the parameter personId as search key*/
  Person.findById(personId, (err, Person) => {
    if(err)
      return console.log(err);

  /** Array.push() method to add "hambuerger" to the list of the person's favoriteFoods */
  Person.favoriteFoods.push(foodToAdd);

  /** and inside the find callback - save() the updated Person */
  Person.save((err, updatePerson) => {
    if(err)
      return console.log(err);
      done(null, updatePerson);
  });
});
};

/** 9) Find and Update */
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, { new: true }, (err, updatedDoc) => {
    if(err)
      return console.log(err);
      done(null, updatedDoc);
  });
};

/** 10) Find and Delete */
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, updatedDoc) => {
    if(err)
      return console.log(err);
     done(null, updatedDoc);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
