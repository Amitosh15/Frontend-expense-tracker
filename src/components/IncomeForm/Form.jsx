import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Form.css";
import { addIncome } from "../../Api/Axios";
import { plus } from "../../utils/Icons";
import { toast } from "react-toastify";

const Form = ({ fetchIncomes }) => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    description: "",
    date: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addIncome(formData);

      fetchIncomes();

      // Clear form
      setFormData({
        title: "",
        amount: "",
        date: null,
        category: "",
        description: "",
      });
      toast.success("Income added successfully");
    } catch (error) {
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err) => toast.error(err.message));
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to add income");
      }
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="input-control text-black">
        <input
          type="text"
          value={formData.title}
          name={"title"}
          placeholder="Title"
          onChange={handleChange}
        />
      </div>
      <div className="input-control text-black">
        <input
          type="text"
          value={formData.amount}
          name={"amount"}
          placeholder="Amount"
          onChange={handleChange}
        />
      </div>
      <div className="input-control text-black">
        <DatePicker
          id="date"
          placeholderText="Enter A Date"
          selected={formData.date}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => {
            setFormData({ ...formData, date: date });
          }}
        ></DatePicker>
      </div>
      <div className="selects input-control flex justify-end text-black">
        <select
          name="category"
          value={formData.category}
          required
          id="category"
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          <option value="salary">Salary</option>
          <option value="freelancing">Freelancing</option>
          <option value="investments">Investment</option>
          <option value="stocks">Stocks</option>
          <option value="bitcoin">Bitcoin</option>
          <option value="bank">Bank Transfer</option>
          <option value="youtube">Youtube</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="input-control">
        <textarea
          name="description"
          value={formData.description}
          placeholder="Add A Reference"
          id="description"
          cols="30"
          rows="4"
          onChange={handleChange}
          className="border border-b"
        ></textarea>
      </div>
      <button type="submit" className="cursor-pointer">
        {plus}Add Income
      </button>
    </form>
  );
};

export default Form;
