import React, { useState, useEffect } from "react";
import actions from "../services/index";
import "../components/styles/transactions.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TheContext from "../TheContext";
//import { get } from "../../../backend/app";
const Transactions = () => {
  let [transactionsExpense, setTransactionExpense] = useState([]);
  let [transactionsIncome, setTransactionIncome] = useState([]);
  let [filterExpense, setFilterExpense] = useState([]);
  let [filterIncome, setFilterIncome] = useState([]);
  let [toggleFilter, setToggleFilter] = useState(true);
  let [grandTotal, setGrandTotal] = useState(0);
  let [expenseObj, setExpenseObj] = useState({});
  let [startDate, setStartDate] = useState("");
  let [endDate, setEndDate] = useState("");

  const {
    user,
    tempExpenses,
    tempIncomes,
    setTempExpenses,
    setTempIncomes,
  } = React.useContext(TheContext);

  useEffect(() => {
    if (user == undefined) {
      console.log("edd", tempExpenses);
      console.log("edd", tempIncomes);
      oneBigLoop(tempExpenses, tempIncomes);
    } else {
      async function getTransacitons() {
        console.log(user);
        //let res = await actions.transactions();

        const [resExpense, resIncome] = await Promise.all([
          actions.transactionsexpense(""),
          actions.transactionsincome(""),
        ]);
        console.log("whatever", resIncome);
        setTransactionExpense(resExpense.data);
        setTransactionIncome(resIncome.data);
        setFilterExpense(resExpense.data);
        setFilterIncome(resIncome.data);

        oneBigLoop(resExpense.data, resIncome.data);
      }
      getTransacitons();
    }
  }, []);

  const displayTransactionsExpense = (arr) => {
    // console.log(filterExpense);
    return arr?.map((eachTransaction, i) => {
      if (eachTransaction.expenseType) {
        console.log(eachTransaction);
        return (
          <tr className="row">
            <td>{eachTransaction.expenseType}</td>
            <td>{eachTransaction.startDate.slice(0, 10)}</td>
            <td>${eachTransaction.amount}</td>
          </tr>
        );
      }
    });
  };

  const displayTransactionsIncome = (arr) => {
    return arr?.map((eachTransaction, i) => {
      if (eachTransaction.incomeType) {
        return (
          <tr className="row">
            <td>{eachTransaction.incomeType}</td>
            <td>{eachTransaction.startDate.slice(0, 10)}</td>
            <td>${eachTransaction.amountIncome}</td>
          </tr>
        );
      }
    });
  };

  const oneBigLoop = (expense, income) => {
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
    setGrandTotal(total);
    setExpenseObj(expenseObj);
  };

  const displayExpenseObj = () => {
    let displayExpense = []; // in is for obj
    console.log(expenseObj);
    for (let e in expenseObj) {
      displayExpense.push(
        <li className="transactions">
          {e.toUpperCase()} ${expenseObj[e]}
        </li>
      );
    }
    return displayExpense;
  };

  const filterTransactions = () => {
    let today = new Date().getMonth();
    ++today < 10 ? (today = "0" + today) : today.toString();
    let expenseCopy = [...transactionsExpense];
    let incomeCopy = [...transactionsIncome];
    let expenseObjCopy = {};
    // if (this.state.toggleFilter == false) {
    expenseCopy = transactionsExpense.filter((expense) => {
      // return expense.startDate.slice(5, 7) === today;
      return (
        new Date(expense.startDate) > startDate &&
        new Date(expense.startDate) < endDate
      );
    });
    incomeCopy = transactionsIncome.filter((income) => {
      // return income.startDate.slice(5, 7) === today;
      return (
        new Date(income.startDate) > startDate &&
        new Date(income.startDate) < endDate
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

    setFilterExpense(expenseCopy);
    setFilterIncome(incomeCopy);
    setExpenseObj(expenseObjCopy);
    setGrandTotal(total);
    setToggleFilter(!toggleFilter);
  };

  const onChange = (dates) => {
    const [start, end] = dates;

    setStartDate(start);
    setEndDate(end);
    // console.log(startDate, endDate, start, end);
    filterTransactions();
    displayExpenseObj();

    // setStartDate(start);
    // setEndDate(end);
  };
  useEffect(() => {
    //console.log(startDate, endDate);
    filterTransactions();
    displayExpenseObj();
  }, [startDate, endDate]);
  return (
    <div>
      <br />
      <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
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
        <tbody>
          {user === undefined
            ? displayTransactionsIncome(tempIncomes)
            : displayTransactionsIncome(filterIncome)}
        </tbody>
      </table>
      <h1>Categories Total</h1>
      <div className="expense-obj">{displayExpenseObj()}</div>
      <h1>Net Income</h1>${grandTotal}
    </div>
  );
};

export default Transactions;
