const { Schema, model } = require("mongoose");

const expenseSchema = new Schema({
  expenseType: {
    type: String,
    enum: [
      "entertainment",
      "restaurant",
      "bills",
      "groceries",
      "transportation",
      "education",
      "home",
      "clothing",
      "travel",
    ],
  },
  notesExpense: {
    type: String,
  },

  amount: Number,
  startDate: Date,

  user: { type: Schema.Types.ObjectId, ref: "User" }, //required: true put later
  //   name: String,
  //   googleId: String,
  //   imageUrl: String,
});

module.exports = model("Expense", expenseSchema);
