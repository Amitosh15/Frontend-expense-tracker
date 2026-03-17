import React, { useContext, useEffect, useState } from "react";
import { getIncome, getExpenses as getExpensesUrl } from "../Api/Axios"; // Assuming getExpense exists similarly

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user"); // Get the stored user object
    if (storedToken && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user data:", e);
        // Clear invalid data if parsing fails
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null); // Ensure user state is null if parsing fails
      }
    }
  }, []);

  const getIncomes = async () => {
    const response = await getIncome();
    setIncomes(response.data);
  };

  const getExpenses = async () => {
    // Assuming you have a getExpense function in your Api/Axios
    const response = await getExpensesUrl();
    setExpenses(response.data);
  };

  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome += income.amount;
    });

    return totalIncome;
  };

  const totalExpenses = () => {
    let total = 0;
    expenses.forEach((expense) => {
      total += expense.amount;
    });

    return total;
  };

  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return history;
  };

  const login = (token, userData) => {
    // Accept userData
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData)); // Store user object
    setUser(userData); // Update context state with user object
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // Remove user object from localStorage
    setUser(null);
  };

  return (
    <GlobalContext.Provider
      value={{
        incomes,
        expenses,
        getIncomes,
        getExpenses,
        totalIncome,
        totalExpenses,
        totalBalance,
        transactionHistory,
        login,
        logout,
        user,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
