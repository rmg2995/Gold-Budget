const { Schema, model } = require("mongoose");

const incomeSchema = new Schema({
  incomeType: {
    type: String,
    enum: ["wage", "tip"],
    required: true,
  },
  frequencyIncome: String,
  amountIncome: Number,
  startDate: Date,
  totalIncome: {
    type: Number,
    default: 0,
  },

  user: { type: Schema.Types.ObjectId, ref: "User" }, //required: true put later
  //   name: String,
  //   googleId: String,
  //   imageUrl: String,
});

module.exports = model("Income", incomeSchema);
