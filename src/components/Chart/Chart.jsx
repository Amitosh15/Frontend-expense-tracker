import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "./Chart.css";
import { useGlobalContext } from "../../context/GlobalContext";
import { useEffect } from "react";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

const Chart = () => {
  const { incomes, expenses, getIncomes, getExpenses } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);

  const data = {
    labels: incomes.map((inc) => {
      const { date } = inc;
      return new Date(date).toLocaleDateString("en-IN");
    }),
    datasets: [
      {
        label: "Income",
        data: [...incomes.map((income) => income.amount)],
        backgroundColor: "green",
        tension: 0.2,
      },
      {
        label: "Expenses",
        data: [...expenses.map((expense) => expense.amount)],
        backgroundColor: "red",
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="chart-con rounded-[20px] h-full">
      <Line data={data} />
    </div>
  );
};

export default Chart;
