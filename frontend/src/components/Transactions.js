import React, { Component } from "react";
import actions from "../services/index";
import "../components/styles/transactions.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Transactions extends Component {
  state = {
    transactionsexpense: [],
    transactionsincome: [],
    filterExpense: [],
    filterIncome: [],
    toggleFilter: false,
  };

  async componentDidMount() {
    // console.log("hey", this.props);
    // let res = await actions.transactions();
    const [resExpense, resIncome] = await Promise.all([
      actions.transactionsexpense(""),
      actions.transactionsincome(""),
    ]);
    console.log("whatever", resIncome);
    this.setState({
      transactionsexpense: resExpense.data,
      transactionsincome: resIncome.data,
      filterIncome: resIncome.data,
      filterExpense: resExpense.data,
    });
    this.oneBigLoop(resExpense.data, resIncome.data);
  }
  displayTransactionsExpense = () => {
    return this.state.filterExpense?.map((eachTransaction, i) => {
      if (eachTransaction.expenseType) {
        return (
          <tr className="row">
            <td>{eachTransaction.expenseType}</td>
            <td>{eachTransaction.startDate.slice(0, 10)}</td>
            <td>${eachTransaction.amount}</td>
            <button
              className="delete-btn"
              onClick={() =>
                this.deleteTransaction(i, eachTransaction._id, "expense")
              }
            >
              Delete
            </button>
          </tr>
        );
      }
    });
  };

  deleteTransaction = async (i, id, list) => {
    let deleteExpense = [...this.state.filterExpense];
    let deleteIncome = [...this.state.filterIncome];
    const response = await actions.expenseDelete(id, list);
    console.log(response.data);
    if (list == "expense") {
      deleteExpense.splice(i, 1);
    } else {
      deleteIncome.splice(i, 1);
    }
    let expenseAmount = 0;
    for (let e of deleteExpense) {
      // console.log(e);
      if (e.amount) expenseAmount += e.amount;
    }
    let incomeAmount = 0;
    for (let i of deleteIncome) {
      // console.log(i);
      if (i.amountIncome) incomeAmount += i.amountIncome;
    }
    let expenseObjCopy = {};
    deleteExpense.forEach((eachExpense) => {
      if (expenseObjCopy[eachExpense.expenseType]) {
        expenseObjCopy[eachExpense.expenseType] += eachExpense.amount;
      } else {
        expenseObjCopy[eachExpense.expenseType] = eachExpense.amount;
      }
    });
    let incomeObjCopy = {};
    deleteExpense.forEach((eachIncome) => {
      if (incomeObjCopy[eachIncome.incomeType]) {
        incomeObjCopy[eachIncome.incomeType] += eachIncome.amount;
      } else {
        incomeObjCopy[eachIncome.incomeType] = eachIncome.amount;
      }
    });
    let total = incomeAmount - expenseAmount;

    this.setState({
      filterExpense: deleteExpense,
      filterIncome: deleteIncome,

      grandTotal: total,
      expenseObj: expenseObjCopy,
    });
  };
  displayTransactionsIncome = () => {
    return this.state.filterIncome.map((eachTransaction, i) => {
      if (eachTransaction.incomeType) {
        return (
          <tr className="row">
            <td>{eachTransaction.incomeType}</td>
            <td>{eachTransaction.startDate.slice(0, 10)}</td>
            <td>${eachTransaction.amountIncome}</td>
            <button
              className="delete-btn"
              onClick={() =>
                this.deleteTransaction(i, eachTransaction._id, "income")
              }
            >
              Delete
            </button>
          </tr>
        );
      }
    });
  };

  oneBigLoop = (expense, income) => {
    //all my math and big loop
    console.log(expense);
    let expenseAmount = 0;
    for (let e of expense) {
      // console.log(e);
      if (e.amount) expenseAmount += e.amount;
    }
    let incomeAmount = 0;
    for (let i of income) {
      // console.log(i);
      if (i.amountIncome) incomeAmount += i.amountIncome;
    }
    let total = incomeAmount - expenseAmount;

    let expenseObj = {};
    for (let e of expense) {
      // if (e.expenseType == "restaurant") expenseCategories += e.amount;
      // of is for arrays
      if (expenseObj[e.expenseType]) {
        expenseObj[e.expenseType] += e.amount;
      } else {
        expenseObj[e.expenseType] = e.amount;
      }
    }
    console.log(expenseObj);
    this.setState({
      grandTotal: total,
      expenseObj: expenseObj,
    });
  };
  displayExpenseObj = () => {
    let displayExpense = []; // in is for obj
    for (let e in this.state.expenseObj) {
      displayExpense.push(
        <li className="transactions">
          {e.toUpperCase()} ${this.state.expenseObj[e]}
        </li>
      );
    }
    return displayExpense;
  };

  filterTransactions = () => {
    let today = new Date().getMonth();
    ++today < 10 ? (today = "0" + today) : today.toString();
    let expenseCopy = [...this.state.transactionsexpense];
    let incomeCopy = [...this.state.transactionsincome];
    let expenseObjCopy = {};
    // if (this.state.toggleFilter == false) {
    expenseCopy = this.state.transactionsexpense.filter((expense) => {
      // return expense.startDate.slice(5, 7) === today;
      return (
        new Date(expense.startDate) > this.state.startDate &&
        new Date(expense.startDate) < this.state.endDate
      );
    });
    incomeCopy = this.state.transactionsincome.filter((income) => {
      // return income.startDate.slice(5, 7) === today;
      return (
        new Date(income.startDate) > this.state.startDate &&
        new Date(income.startDate) < this.state.endDate
      );
    });

    expenseCopy.forEach((eachExpense) => {
      if (expenseObjCopy[eachExpense.expenseType]) {
        expenseObjCopy[eachExpense.expenseType] += eachExpense.amount;
      } else {
        expenseObjCopy[eachExpense.expenseType] = eachExpense.amount;
      }
    });
    let expenseAmount = 0;
    for (let e of expenseCopy) {
      // console.log(e);
      if (e.amount) expenseAmount += e.amount;
    }
    let incomeAmount = 0;
    for (let i of incomeCopy) {
      // console.log(i);
      if (i.amountIncome) incomeAmount += i.amountIncome;
    }
    let total = incomeAmount - expenseAmount;
    // expenseObjCopy = this.state.expenseObj.filter((total) => {
    //   // return income.startDate.slice(5, 7) === today;
    //   return (
    //     new Date(total.startDate) > this.state.startDate &&
    //     new Date(total.startDate) < this.state.endDate
    //   );
    // });
    // }
    // console.log(incomeCopy, expenseCopy);
    this.setState({
      filterExpense: expenseCopy,
      filterIncome: incomeCopy,
      expenseObj: expenseObjCopy,
      grandTotal: total,
      toggleFilter: !this.state.toggleFilter,
    });
  };

  onChange = (dates) => {
    const [start, end] = dates;
    this.setState(
      {
        startDate: start,
        endDate: end,
      },
      this.filterTransactions,
      this.displayExpenseObj
    );

    // setStartDate(start);
    // setEndDate(end);
  };

  render() {
    console.log("looking 199", this.state);
    return (
      <div>
        <br />
        <DatePicker
          selected={this.state.startDate}
          onChange={this.onChange}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          selectsRange
          inline
        />
        <h1>Income</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.displayTransactionsIncome()}</tbody>
        </table>
        <h1>Expense</h1>
        <table className="table expense-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.displayTransactionsExpense()}</tbody>
        </table>
        <h1>Net Income</h1>${this.state.grandTotal}
        <br />
        <h1>Categories Total</h1>
        <div className="expense-obj">{this.displayExpenseObj()}</div>
      </div>
    );
  }
}

export default Transactions;
