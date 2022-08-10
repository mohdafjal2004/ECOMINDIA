import React, { useState } from "react";
import bg from "./bgblack.jpg";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../store/userActions";
import { useSelector, useDispatch } from "react-redux";

const Signup = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = data;
  useSelector((state) => state.user);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  
  //! Remember to send data(destructured before) into ActionCreators while dispatching them into store
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password, name };
    dispatch(registerUser(userData));
    navigate('/login')
  };

  return (
    <div className="absolute top-16 w-screen   grid justify-items-center md:block">
      <div className="sm:flex justify-between ">
        <div className=" w-2/3 col-span-2 mt-10 sm:mt-20 grid justify-items-center  ">
          <h1 className="text-2xl md:text-4xl ">Create an account</h1>
          <hr className="w-80 " />
          <input
            type="text"
            placeholder="Enter Name"
            className="border-2 mt-3 w-[300px] px-2 rounded-lg py-2"
            name="name"
            onChange={handleChange}
            value={data.name}
          />
          <input
            type="email"
            placeholder="Enter Email"
            className="border-2 mt-3 w-[300px] px-2 rounded-lg py-2"
            name="email"
            onChange={handleChange}
            value={data.email}
          />
          <input
            type="password"
            placeholder="Enter Password"
            className="border-2 mt-3 w-[300px] px-2 rounded-lg py-2"
            name="password"
            onChange={handleChange}
            value={data.password}
          />
          <button
            className="border-2 mt-4 w-24 rounded-lg p-1 "
            onClick={handleSubmit}
          >
            Sign up{" "}
          </button>
          <p className="text-[9px] text-gray-400 mt-2">
            We don't share your personal details with anyone
          </p>
        </div>
        <div
          className="  text-white bg-cover bg-center bg-no-repeat border-2 
          border-black sm:h-[500px] h-[65vh] sm:w-[450px] w-[320px]   sm:mt-0 grid sm:min-h-[100vh]"
          style={{
            backgroundImage: `url(${bg}`,
          }}
        >
          <div className="justify-self-center mt-36">
            <h1>Have an account ?</h1>

            <button className="border-2 border-white w-3/4 mx-4 mt-2 p-2 rounded-md ">
              <Link to="/login" className="text-white no-underline">
                Login
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
