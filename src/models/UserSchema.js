const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

  username: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  birthdate: {
    type: String,
    required: true,
  },

  secret: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    required: true,
  },

  favorites: {
    type: [
      {
        type: String,
      },
    ],
    validate: [favoritesLimiter, "Please, insert 5 favorite things."],
    required: true,
  },

  brothers: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    validate: [brotherLimiter, "You can only have 5 brothers."],
  },

  inbox: {
    type: [
      {
        type: String,
      },
    ],
    required: false,
  },

  outbox: {
    type: [
      {
        type: String,
      },
    ],
    required: false,
  },

  receivedBBRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],

  sentBBRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],

  registeredIn: {
    type: Date,
    default: new Date(),
  },
});

function favoritesLimiter(fav) {
    return fav.length === 5}

    function brotherLimiter(bro) {
  return bro.length <= 5
}

const User = mongoose.model("User", UserSchema);


module.exports = User