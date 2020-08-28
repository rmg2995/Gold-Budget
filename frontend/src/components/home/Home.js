import React, { Component, useState, useEffect } from "react";
import actions from "../../services/index";
import PieChart from "./PieChart";
import "../styles/home.scss";
import TheContext from "../../TheContext";

const Home = () => {
  let [transactionsExpense, setTransactionsExpense] = useState([]);
  let [transactionsIncome, setTransactionsIncome] = useState([]);
  let [randomIncomeAmount, setRandomIncomeAmount] = useState(
    Math.floor(Math.random() * 10000)
  );
  let [randomExpenseAmount, setRandomExpenseAmount] = useState(
    Math.floor(Math.random() * 10000)
  );
  let [grandTotal, setGrandTotal] = useState(0);
  let [expenseObj, setExpenseObj] = useState({});

  const { user } = React.useContext(TheContext);

  useEffect(() => {
    async function getTransacitons2() {
      const [resExpense, resIncome] = await Promise.all([
        actions.transactionsexpense(""),
        actions.transactionsincome(""),
      ]);
      console.log("whatever", resIncome);

      setTransactionsExpense(resExpense.data);
      setTransactionsIncome(resIncome.data);

      oneBigLoop(resExpense.data, resIncome.data);
    }
    getTransacitons2();
  }, []);

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
    let expenseCategories = 0;
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
    setRandomExpenseAmount(expenseAmount);
    setRandomIncomeAmount(incomeAmount);
  };

  const displayExpenseObj = () => {
    let displayExpense = []; // in is for obj
    for (let e in expenseObj) {
      displayExpense.push(
        <li className="transaction-list">
          {e.toUpperCase()}: ${expenseObj[e]}
        </li>
      );
    }
    return displayExpense;
  };

  let data = [
    { name: "entertainment", value: Math.floor(Math.random() * 100) },
    { name: "bills", value: Math.floor(Math.random() * 100) },
    { name: "groceries", value: Math.floor(Math.random() * 100) },
    { name: "transportation", value: Math.floor(Math.random() * 100) },
    // { name: "clothing", value: Math.floor(Math.random() * 100) },
  ];
  let data2 = [
    { name: "income", value: Math.floor(Math.random() * 100) },
    { name: "expenses", value: Math.floor(Math.random() * 100) },
  ];

  if (user?._id) {
    data = [];
    data2 = [];
    for (let e in expenseObj) {
      data.push({
        name: e,
        value: expenseObj[e],
      });
    }
    data2.push(
      {
        name: "income",
        value: randomIncomeAmount,
      },
      {
        name: "expenses",
        value: randomExpenseAmount,
      }
    );
  }

  // console.log(JSON.stringify(data));
  // console.log(JSON.stringify(data2));
  return (
    <div>
      <h1>My Wallet</h1>
      <div className="buttons">
        <button className="income-button">
          Income <br />${randomIncomeAmount}
        </button>
        <button className="outcome-button">
          Expenses <br />${randomExpenseAmount}
        </button>
      </div>
      <div className="PieCharts">
        <div>
          <h2>Yearly Expense - Category Breakdown</h2>
          <PieChart data={data} />
        </div>
        <div>
          <h2>Yearly Income Vs Expense Breakdown</h2>
          <PieChart data={data2} />
        </div>
      </div>
      <div>
        <h1>Categories</h1>
        <div className="transaction-display">{displayExpenseObj()}</div>
      </div>
    </div>
    // </body>
  );
};

export default Home;
