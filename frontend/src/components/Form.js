import React, { Component, Fragment, useState, useEffect } from "react";
import actions from "../services/index";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/form.scss";
// import DatePicker from "react-date-picker";

class Form extends Component {
  state = {
    expenseType: "",
    frequency: "",
    startDate: new Date(),
    // date: new Date(),
    // dollarAmount: 0,
    // frequency: "",
    // date:
  };
  // onChange = (date) => this.setState({ date });
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onChange = (date) => {
    this.setState({
      startDate: date,
    });
  };
  // onChange = (date) => this.setState({ date });

  submitForm = async (e, type) => {
    console.log(type);
    e.preventDefault();
    let obj = { ...this.state, user: this.props.userId._id };
    let res =
      type === "e"
        ? await actions.expenseCount(obj)
        : await actions.incomeCount(obj);
    alert("Success! You have added a transaction!");
    // this.formRef.reset();
  };

  render() {
    return (
      <div>
        <form
          action="/action_page.php"
          onSubmit={(e) => this.submitForm(e, "e")}
        >
          <div className="expense-spacing">
            <label className="labels" for="Expense">
              Expense
            </label>
            <select
              className="select-expense-income"
              onChange={this.handleChange}
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
              onChange={this.handleChange}
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
              selected={this.state.startDate}
              onChange={this.onChange}
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
              onChange={this.handleChange}
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
              onChange={this.handleChange}
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
              selected={this.state.startDate}
              onChange={this.onChange}
            />
          </div>
          <button className="submit-button">Submit</button>
        </form>
      </div>
    );
  }
}

export default Form;
