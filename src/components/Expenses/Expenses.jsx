import { useEffect } from "react";
import "../../styles/global.css";
import "../Incomes/Income.css";
import { deleteExpenses } from "../../Api/Axios";
import { calender, comment, trash } from "../../utils/Icons";
import { expenseCategories } from "../CategoryConfig/categoryConfig";
import ExpenseForm from "../ExpensesForm/ExpenseForm";
import { useGlobalContext } from "../../context/GlobalContext";

const Expenses = () => {
  const { expenses, getExpenses, totalExpenses } = useGlobalContext();

  useEffect(() => {
    getExpenses();
  }, []);

  // Delete Expenses
  const handleDelete = async (id) => {
    try {
      await deleteExpenses(id);
      getExpenses();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container overflow-y-auto">
      <h1 className="text-2xl">Expenses</h1>
      <h2 className="total-income flex justify-center items-center bg-[#FCF6F9] rounded-[20px]">
        Total Expenses: <span>₹{totalExpenses()}</span>
      </h2>
      <div className="income-content flex items-start gap-4">
        {/* Form container */}
        <div className="form-container">
          <ExpenseForm fetchExpenses={getExpenses} />
        </div>
        {/* Income  */}
        <div className="incomes flex-1">
          {expenses.map((expense) => {
            const { _id, title, amount, date, category, description } = expense;
            // console.log(income);
            return (
              <div
                key={_id}
                className="income-con flex items-center gap-4 bg-[#FCF6F9] rounded-[20px]"
              >
                <div className="icon w-20 h-20 rounded-[20px] bg-[#F5F5F5] flex items-center justify-center">
                  {expenseCategories[category]}
                </div>
                <div className="content flex flex-col gap-1 w-full">
                  {/* Title */}
                  <h5 className="text-[1.3rem] text-[#222260]">{title}</h5>
                  {/* Text content */}
                  <div className="inner-content">
                    <p>₹ {amount}</p>
                    <p>
                      {calender} {new Date(date).toLocaleDateString("en-IN")}
                    </p>
                    <p>
                      {comment} {description}
                    </p>
                    {/* Button */}
                    <div className="delete-btn">
                      <button
                        className="flex items-center justify-center"
                        onClick={() => handleDelete(_id)}
                      >
                        {trash}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Expenses;
