const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const EmailSchema = new Schema({
  hostName: { type: Schema.Types.ObjectId, ref: "User" },
  gameId: {
    type: Number,
    required: true,
  },
  message: {
    to: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    html: {
      type: String,
    },
  },
});

// to: 'test@example.com', // Change to your recipient
// from: 'test@example.com', // Change to your verified sender
// subject: 'Sending with SendGrid is Fun',
// text: 'and easy to do anywhere, even with Node.js',
// html: '<strong>and easy to do anywhere, even with Node.js</strong>',

const Email = model("Email", EmailSchema);

module.exports = Email;
