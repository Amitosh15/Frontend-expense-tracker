import { useGlobalContext } from "../../context/GlobalContext";
import "./History.css";

const History = () => {
  const { transactionHistory } = useGlobalContext();

  const history = transactionHistory().slice(0, 8);

  return (
    <div className="flex flex-col gap-4">
      <h2>Recent History</h2>
      {history.map((item) => {
        const { _id, title, amount, type } = item;
        return (
          <div
            key={_id}
            className="history-item bg-[#FCF6F9] rounded-[20px] flex justify-between items-center"
          >
            <p style={{ color: type === "expense" ? "red" : "#42AD00" }}>
              {title}
            </p>
            <p style={{ color: type === "expense" ? "red" : "#42AD00" }}>
              {type === "expense" ? `${amount}` : `+${amount}`}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default History;
