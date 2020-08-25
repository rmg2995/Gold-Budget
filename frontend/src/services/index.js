import axios from "axios";

let baseURL;

process.env.NODE_ENV === "production"
  ? (baseURL = "/api") //"https://ironbudget.herokuapp.com")
  : (baseURL = "http://localhost:5000/api");
console.log(process.env.NODE_ENV, "monkey", baseURL);
const service = axios.create({ withCredentials: true, baseURL });

const actions = {
  isLoggedIn: async () => {
    return await service.get("/is-logged-in");
  },
  signUp: async (user) => {
    console.log();
    return await service.post("/signup", user);
  },
  logIn: async (user) => {
    return await service.post("/login", user);
  },
  logOut: async () => {
    return await service.get("/logout");
  },
  expenseCount: async (expenseLog) => {
    console.log(expenseLog);
    return await service.post("/expense", expenseLog);
  },
  incomeCount: async (incomeLog) => {
    return await service.post("/income", incomeLog);
  },
  transactions: async () => {
    return await service.get("/transactions");
  },
  transactionsexpense: async (user) => {
    return await service.get(`/transactionsexpense?id=${user}`);
  },
  transactionsincome: async (user) => {
    return await service.get(`/transactionsincome?id=${user}`);
  },
  expenseDelete: async (id, list) => {
    return await service.post(`/${list}/${id}/delete`);
  },
};

export default actions;
