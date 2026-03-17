import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../../Api/Axios";
import { useGlobalContext } from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../styles/global.css";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const { login } = useGlobalContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(loginInfo);
      const { token, user } = res.data; // Destructure user object

      login(token, user); // Pass user object to login
      toast.success("Login successful!");
      // Clear the form
      setLoginInfo({
        email: "",
        password: "",
      });
      navigate("/dashboard");
    } catch (error) {
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err) => toast.error(err.message));
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Login failed");
      }
    }
  };

  return (
    <div className="container flex items-center justify-center">
      <div className="login-form bg-[#FCF6F9] border-2 flex flex-col gap-5 items-center">
        <h1 className="text-3xl">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div>
            <label htmlFor="email">Email</label>
            <br />
            <input
              onChange={handleChange}
              type="email"
              name="email"
              value={loginInfo.email}
              placeholder="Enter your email..."
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <br />
            <input
              onChange={handleChange}
              type="password"
              name="password"
              value={loginInfo.password}
              placeholder="Enter your password..."
            />
          </div>
          <button>Login</button>
          <span>
            New user{" "}
            <Link to="/signup" className="text-blue-600">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
