// var mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/postsDB');

// var Schema = mongoose.Schema;

// var commentSchema = new mongoose.Schema({
//     text: String,
//     username: String
// });

// var postSchema = new mongoose.Schema({
//     text: String,
//     username: String,
//     comments: [commentSchema]
// });

// var Post = mongoose.model('Post', postSchema);
// var aPost = new Post({ username: 'Noa', text: 'My first post'});
// aPost.comments.push({username: 'bob', text: 'amazing'});
// aPost.save(function(error, data) {
//         if (error) { 
//             console.error(error);
//         } else {
//             console.log(data);
//         }
//     });

// var authorSchema = new mongoose.Schema({
//     name: String,
//     DOB: Date,
//     height: Number
//   })
  
//   var bookSchema = new mongoose.Schema({
//     numberOfPages: Number,
//     author: authorSchema
//   })

//   var Book = mongoose.model('book', bookSchema)
  
//   Book.create({
//     numberOfPages: 22,
//     author: {
//       name: "Joe",
//       height: 156
//     }
//   }, function(err, data) {
//     if (err) {
//       return console.error(err)
//     }
//     console.log(data)
//   })

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/populationEx');

var bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    reviews: [{type: Schema.Types.ObjectId, ref: 'review'}]
})

var Book = mongoose.model("book", bookSchema);

var criticSchema = new mongoose.Schema({
    name: String, 
    reviews: [{type: Schema.Types.ObjectId, ref: 'review'}]
})

var Critic = mongoose.model("critic", criticSchema);

var reviewSchema = new mongoose.Schema({
    text: String,
    book: {type: Schema.Types.ObjectId, ref: 'book'},
    critic: {type: Schema.Types.ObjectId, ref: 'critic'}
})

var Review = mongoose.model("review", reviewSchema);

var critic1 = new Critic({
    name: 'critic1',
    reviews: []
});

var book1 = new Book({
    title: 'book1',
    author: 'author1',
    reviews: []
});

var review = new Review({
    text: 'great',
    book: book1._id,
    critic: critic1._id
});

// review.save();

book1.reviews.push(review);
critic1.reviews.push(review);

// book1.save();
// critic1.save();

// Book.findOne({title:"book1"}).populate('reviews').exec(function(err, book){
//     console.log(book);
//   }); 

// Book.findOne({title:"book1"}, function(err, book){
//     console.log(book)
//   })

Critic.findOne({name:"critic1"}).populate('reviews').exec(function(err, critic){
    console.log(critic);
})

// Book.findOne({title:'book1'}).populate({
//     path: 'reviews',
//     populate: {
//         path: 'critic'
//         }
//     }).exec(function(err,book) {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(book.reviews[0].critic);
//     }
// })

// Critic.findOne({name: 'critic1'}).populate ({
//     path: 'reviews',
//     populate: {
//         path: 'book'
//         }
//     }).exec(function(err, critic) {
//         if (err) {
//             console.error(err);
//         } else {
//             console.log(critic.reviews[0].book);
//         }
//     });

//     Critic.findOne({ name: "critic1" }).populate('reviews', 'text-_id').exec(function(err, critic) {
//         console.log(critic.reviews);
//       });
