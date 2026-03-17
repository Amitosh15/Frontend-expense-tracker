import { useGlobalContext } from "../../context/GlobalContext";
import Chart from "../Chart/Chart";
import "./Dashboard.css";
import "../../styles/global.css";
import History from "../History/History";

const Dashboard = () => {
  const { totalExpenses, totalIncome, totalBalance } = useGlobalContext();

  return (
    <div className="container">
      <div className="dashboard-con">
        <h1 className="text-2xl">All Transactions</h1>
        <div className="stats-con">
          <div className="chart-main">
            <div className="chart-con">
              <Chart />
            </div>
            <div className="amount-con">
              <div className="income">
                <h2>Total Income</h2>
                <p>₹ {totalIncome()}</p>
              </div>
              <div className="expense">
                <h2>Total Expense</h2>
                <p>₹ {totalExpenses()}</p>
              </div>
              <div className="balance">
                <h2>Total Balance</h2>
                <p>₹ {totalBalance()}</p>
              </div>
            </div>
          </div>

          <div className="history-con">
            <History />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
