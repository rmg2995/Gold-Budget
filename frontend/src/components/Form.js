import React, { useState } from "react";
import actions from "../services/index";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/form.scss";
import TheContext from "../TheContext";
// import DatePicker from "react-date-picker";

const Form = (props) => {
  let [expenseType, setExpenseType] = useState("");
  let [frequency, setFrequency] = useState("");
  let [startDate, setStartDate] = useState(new Date());
  let [amount, setAmount] = useState(null);
  let [incomeType, setIncomeType] = useState("");
  let [incomeAmount, setIncomeAmount] = useState(null);

  const submitForm = async (e, type) => {
    console.log(type);
    e.preventDefault();
    let obj = {
      expenseType: expenseType,
      frequency: frequency,
      startDate: startDate,
      amount: amount,
      incomeType: incomeType,
      incomeAmount: incomeAmount,
      user: user._id,
    };
    let res =
      type === "e"
        ? await actions.expenseCount(obj)
        : await actions.incomeCount(obj);
    alert("Success! You have added a transaction!");
    // this.formRef.reset();
  };

  const { user } = React.useContext(TheContext);

  return (
    <div>
      <form action="/action_page.php" onSubmit={(e) => submitForm(e, "e")}>
        <div className="expense-spacing">
          <label className="labels" for="Expense">
            Expense
          </label>
          <select
            className="select-expense-income"
            onChange={(e) => setExpenseType(e.target.value)}
            name="expenseType"
            id=""
          >
            <option value="" disabled selected>
              Select Expense
            </option>
            <option value="entertainment">Entertainment</option>
            <option value="restaurant">Restaurant</option>
            <option value="bills">Bills</option>
            <option value="groceries">Groceries</option>
            <option value="transportation">Transportation</option>
            <option value="education">Education</option>
            <option value="home">Home</option>
            <option value="clothing">Clothing</option>
            <option value="travel">Travel</option>
          </select>
        </div>
        {/* <br /> */}
        {/* <label for="Expense">Frequency</label>
          <select onChange={this.handleChange} name="frequency" id="">
            <option value="" disabled selected>
              Select Frequency
            </option>
            <option value="one-time">One-time</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <br /> */}
        <div className="expense-spacing">
          <label className="labels">Amount</label>

          <input
            className="enter-amount"
            onChange={(e) => setAmount(e.target.value)}
            type="Number"
            step="0.01"
            id=""
            name="amount"
            step="0.01"
            min="0"
          ></input>
        </div>
        <div className="expense-spacing">
          <label className="labels">Date</label>
          <DatePicker
            className="select-date"
            name="startDate"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
          {/* <DatePicker
            name="date"
            onChange={this.onChange}
            value={this.state.date}
          /> */}
        </div>
        <button className="submit-button">Submit</button>
      </form>
      <form action="/action_page.php" onSubmit={(e) => this.submitForm(e)}>
        <div className="expense-spacing">
          <label className="labels" for="Income">
            Income
          </label>
          <select
            className="select-expense-income"
            onChange={(e) => setIncomeType(e.target.value)}
            name="incomeType"
            id=""
          >
            <option value="" disabled selected>
              Select Income
            </option>
            <option value="wage">Wage</option>
            <option value="tip">Tip</option>
          </select>
        </div>
        {/* <label for="Income">Frequency</label>
          <select onChange={this.handleChange} name="frequencyIncome" id="">
            <option value="" disabled selected>
              Select Frequency
            </option>
            <option value="one-time">One-time</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <br /> */}
        <div className="expense-spacing">
          <label className="labels">Amount</label>
          <input
            className="enter-amount"
            onChange={(e) => setIncomeAmount(e.target.value)}
            type="Number"
            step="0.01"
            id=""
            name="amountIncome"
            step="0.01"
            min="0"
          ></input>
        </div>
        {/* <DatePicker
            name="dateIncome"
            onChange={this.onChange}
            value={this.state.date}
          /> */}
        <div className="expense-spacing">
          <label className="labels">Date</label>
          <DatePicker
            className="select-date"
            name="startDate"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
        <button className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default Form;
