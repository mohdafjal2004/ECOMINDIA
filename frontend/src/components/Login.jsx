import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import bg from "./bgblack.jpg";
import { loginUser } from "../store/userActions";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  //Destructuring data to send them into store by dispatching them
  const { email, password } = data;

  useSelector((state) => state.user.users);

  //! Remember to send data(destructured before) into ActionCreators while dispatching them into store
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };

    dispatch(loginUser(userData));
    if (localStorage.getItem("usertoken") === "Invalid Credientils") {
      navigate("/login");
    } else {
      navigate("/");
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="absolute top-16 w-screen   grid justify-items-center md:block">
      <div className="sm:flex justify-between ">
        <div className=" w-2/3 col-span-2 mt-10 sm:mt-20 grid justify-items-center h-10 ">
          <h1 className="text-2xl md:text-4xl">Login to Your Account</h1>
          <hr className="w-80 " />
          <input
            type="email"
            placeholder="Enter Email"
            className="border-2 mt-3 w-[300px] px-2 rounded-lg py-2"
            value={data.email}
            onChange={handleChange}
            id="email"
            name="email"
          />
          <input
            type="password"
            placeholder="Enter Password"
            className="border-2 mt-3 w-[300px] px-2 rounded-lg py-2"
            value={data.password}
            onChange={handleChange}
            id="password"
            name="password"
          />
          <button
            className="border-2 mt-4 w-24 rounded-lg p-1 "
            onClick={handleSubmit}
          >
            Login{" "}
          </button>
        </div>
        <div
          className="  text-white bg-cover bg-center bg-no-repeat border-2 
          border-black sm:h-[500px] h-[65vh] sm:w-[450px] w-[320px]  mt-64 sm:mt-0 grid sm:min-h-[100vh]"
          style={{
            backgroundImage: `url(${bg}`,
          }}
        >
          <div className="justify-self-center mt-36">
            <h1>New Here ?</h1>
            <button className="border-2 border-white w-3/4 mx-4 mt-2 p-2 rounded-md ">
              <Link to="/signup" className="text-white no-underline">
                Sign up
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
