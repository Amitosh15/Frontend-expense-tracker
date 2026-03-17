import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../../Api/Axios";
import { toast } from "react-toastify";
import "../../styles/global.css";

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await registerUser(signupInfo);
      toast.success("Signup successful!");

      setSignupInfo({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      if (error.response) {
        const body = error.response.data;

        if (body.error && Array.isArray(body.error)) {
          body.errors.forEach((e) => toast.error(e.message));
        } else if (body.message) {
          toast.error(body.message);
        } else {
          toast.error("Please fill all required fields");
        }
      } else {
        toast.error("Network error");
      }
    }
  };

  return (
    <div className="container flex items-center justify-center">
      <div className="signup-form bg-[#FCF6F9] border-2 flex flex-col text-center gap-5 items-center">
        <h1 className="text-3xl">Signup</h1>
        <form
          onSubmit={handleSignup}
          className="flex flex-col items-center text-left"
        >
          <div>
            <label htmlFor="name">Name</label>
            <br />
            <input
              onChange={handleChange}
              type="text"
              name="name"
              placeholder="Enter your name..."
              value={signupInfo.name}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <br />
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={signupInfo.email}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <br />
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter your password..."
              value={signupInfo.password}
            />
          </div>
          <button>Signup</button>
          <span>
            Already have an account ?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
