import React, { useState, useEffect } from "react";
import actions from "../services/index";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/form.scss";
import TheContext from "../TheContext";
// import DatePicker from "react-date-picker";

//hooks
const Form = (props) => {
  let [expenseType, setExpenseType] = useState("");
  let [frequency, setFrequency] = useState("");
  let [startDate, setStartDate] = useState(new Date());
  let [amount, setAmount] = useState(null);
  let [incomeType, setIncomeType] = useState("");
  let [amountIncome, setAmountIncome] = useState(null);
  // let [displayExpenses, setDisplayExpenses] = useState([]);
  let [transactionsExpense, setTransactionExpense] = useState([]);
  let [transactionsIncome, setTransactionIncome] = useState([]);
  let [filterExpense, setFilterExpense] = useState([]);
  let [filterIncome, setFilterIncome] = useState([]);
  let [grandTotal, setGrandTotal] = useState(0);
  let [expenseObj, setExpenseObj] = useState({});

  //context
  const {
    user,
    tempExpenses,
    setTempExpenses,
    tempIncomes,
    setTempIncomes,
  } = React.useContext(TheContext);

  //component did mount, connects to backend
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

  //submit form
  const submitForm = async (e, type) => {
    if (user === undefined) {
      e.preventDefault();
      if (type === "e") {
        let expenseObj = {
          expenseType: expenseType,
          frequency: frequency,
          startDate: startDate.toString(),
          amount: parseInt(amount),
        };
        let tempExpensesCopy = [...tempExpenses];
        tempExpensesCopy.push(expenseObj);
        setTempExpenses(tempExpensesCopy);
        alert("Success! You have added a transaction!");
      } else {
        let incomeObj = {
          incomeType: incomeType,
          amountIncome: parseInt(amountIncome),
          startDate: startDate.toString(),
        };
        let tempIncomesCopy = [...tempIncomes];
        tempIncomesCopy.push(incomeObj);
        setTempIncomes(tempIncomesCopy);
        alert("Success! You have added a transaction!");
      }
    } else {
      console.log(type);
      e.preventDefault();
      let obj = {
        expenseType: expenseType,
        frequency: frequency,
        startDate: startDate,
        amount: amount,
        incomeType: incomeType,
        amountIncome: amountIncome,
        user: user._id,
      };
      let res =
        type === "e"
          ? await actions.expenseCount(obj)
          : await actions.incomeCount(obj);
      alert("Success! You have added a transaction!");
      // this.formRef.reset();
    }
  };

  //display transaction expense and income
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
            <button
              className="delete-btn"
              onClick={() =>
                user === undefined
                  ? deleteTempTransaction(i, "expense")
                  : deleteTransaction(i, eachTransaction._id, "expense")
              }
            >
              Delete
            </button>
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
            <button
              className="delete-btn"
              onClick={() =>
                user === undefined
                  ? deleteTempTransaction(i, "income")
                  : deleteTransaction(i, eachTransaction._id, "income")
              }
            >
              Delete
            </button>
          </tr>
        );
      }
    });
  };

  //delete functions
  const deleteTempTransaction = (i, list) => {
    let deleteTempExpense = [...tempExpenses];
    let deleteTempIncome = [...tempIncomes];
    if (list == "expense") {
      deleteTempExpense.splice(i, 1);
      setTempExpenses(deleteTempExpense);
    } else {
      deleteTempIncome.splice(i, 1);
      setTempIncomes(deleteTempIncome);
    }
    let expenseAmount = 0;
    for (let e of deleteTempExpense) {
      // console.log(e);
      if (e.amount) expenseAmount += e.amount;
    }
    let incomeAmount = 0;
    for (let i of deleteTempIncome) {
      // console.log(i);
      if (i.amountIncome) incomeAmount += i.amountIncome;
    }
    let expenseObjCopy = {};
    deleteTempExpense.forEach((eachExpense) => {
      if (expenseObjCopy[eachExpense.expenseType]) {
        expenseObjCopy[eachExpense.expenseType] += eachExpense.amount;
      } else {
        expenseObjCopy[eachExpense.expenseType] = eachExpense.amount;
      }
    });
    let incomeObjCopy = {};
    deleteTempExpense.forEach((eachIncome) => {
      if (incomeObjCopy[eachIncome.incomeType]) {
        incomeObjCopy[eachIncome.incomeType] += eachIncome.amount;
      } else {
        incomeObjCopy[eachIncome.incomeType] = eachIncome.amount;
      }
    });
    let total = incomeAmount - expenseAmount;
    setGrandTotal(total);
    setExpenseObj(expenseObjCopy);
  };

  const deleteTransaction = async (i, id, list) => {
    let deleteExpense = [...filterExpense];
    let deleteIncome = [...filterIncome];
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

    setFilterExpense(deleteExpense);
    setFilterIncome(deleteIncome);

    setGrandTotal(total);
    setExpenseObj(expenseObjCopy);
  };

  //one big loop that all income minus all expenses
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
      <form action="/action_page.php" onSubmit={(e) => submitForm(e)}>
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
            onChange={(e) => setAmountIncome(e.target.value)}
            type="Number"
            step="0.01"
            id=""
            name="incomeAmount"
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
      {user === undefined
        ? displayTransactionsIncome(tempIncomes)
        : displayTransactionsIncome(filterIncome)}

      {user === undefined
        ? displayTransactionsExpense(tempExpenses)
        : displayTransactionsExpense(filterExpense)}
    </div>
  );
};

export default Form;
