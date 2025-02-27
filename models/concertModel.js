const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema ({
  id: Number,
  ticket_id: String,
  reservation_id: String,
  isAvailable: {
    type: Boolean,
    default: true
  }
  
  
})

const rowSchema = new mongoose.Schema({
id: Number,
name: String,
order: Number,
seats: [seatSchema]
})


const locationSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  name: String,
  row: [
    rowSchema
  ]
})

const showSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    start: Date,
    end: Date,
})

const concertSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  location: locationSchema,
  shows:[showSchema]
})

module.exports = mongoose.model('concerts', concertSchema);


// // Export the concerShema model
// module.exports = mongoose.model('concerts', concertSchema);


// const mongoose = require('mongoose');
// const Schema = mongoose.Schema





// const locationSchema = new mongoose.Schema({
//   _id: {
//     type: Number,
//     required: true
//   },
//   name: String,
//   row_ids: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "row"
//     }
//   ]
// })


// const concertSchema = new mongoose.Schema({
//   _id: {
//     type: Number,
//     required: true
//   },
//   artist: {
//     type: String,
//     required: true
//   },
//   location: locationSchema,
//   shows_ids:[{
//    type: Schema.Types.ObjectId,
//    ref: "location"
//   }],
// })


