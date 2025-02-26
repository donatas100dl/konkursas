const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    emailVerified: {
      type: Boolean,
      default: true, //chage to false in futre
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    // avatarUrl: {
    //   type: String,
    //   default: "../assets/profile_placeholder_2.jpg",
    // }
    calendar: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Calendar' }],

  });

module.exports = mongoose.model("user", usersSchema);
