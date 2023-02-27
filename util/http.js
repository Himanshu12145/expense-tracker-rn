import axios from "axios";
const BACKEND_URL =
  "https://expense-tracker-backend-b63af-default-rtdb.firebaseio.com";

export async function storeExpense(expenseData) {
  const response = await axios.post(
    BACKEND_URL + "/expenses.json",
    expenseData
  );
  const id = response.data.name;
  return id;
}

export async function fetchExpense() {
  const response = await axios.get(BACKEND_URL + "/expenses.json");

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
}
// const response = await axios.get(`${BACKEND_URL}/expenses.json`);
// const expenses = [];
// console.log(response.data);
// for (const key in response.data) {
//   const expenseObj = {
//     id: key,
//     amount: response.data[key].amount,
//     data: new Date(response.data[key].date),
//     description: response.data[key].description,
//   };
//   expenses.push(expenseObj);
// }
// return expenses;
