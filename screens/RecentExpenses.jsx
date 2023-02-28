import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpense } from "../util/http";

const RecentExpenses = () => {
  const [isFetching, setIsFetching] = useState(true);
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      const expenses = await fetchExpense();
      setIsFetching(false);
      expensesCtx.setExpenses(expenses);
    }
    getExpenses();
  }, []);
  if (isFetching) {
    return <LoadingOverlay />;
  }

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    // console.log(today, expense.date, date7DaysAgo, expense.date > date7DaysAgo);
    return expense.date >= date7DaysAgo && expense.date <= today;
  });
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      fallBackText="No expenses registered for the last 7 days."
      expensesPeriod="Last 7 days"
    />
  );
};

export default RecentExpenses;

const styles = StyleSheet.create({});
