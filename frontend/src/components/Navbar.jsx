import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCartProducts } from "../store/cartActions";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.cart.cart);
  console.log(data.data);
   
     
  const { userToken } = useSelector((state) => state.user);
  
  const [open, setOpen] = useState(false);
  
  const handleLogOut = () => {
    localStorage.removeItem("usertoken");
    navigate("/login");
  }; 
  
  useEffect(() => {
    if (userToken) {
      dispatch(getCartProducts());
    }
    // eslint-disable-next-line
  }, []);

  return (
    <nav
      className="w-full fixed   z-50  shadow-2xl  shadow-gray-700/60  bg-opacity-90 
       border-y-cyan-100 bg-black"
    >
      <div className="p-3 font-normal text-2xl  flex  items-center justify-between  md:px-10   ">
        <Link to="/ " className="no-underline">
          <div className="sm:w-1/3 text-white ml-6">EcomIndia</div>
        </Link>

        <div
          className="absolute top-5 right-10 text-white sm:invisible "
          onClick={() => setOpen(!open)}
        >
          <ion-icon name={open ? "close" : "menu"}></ion-icon>
        </div>
        <div>
          <ul
            className={`list-none flex flex-col sm:flex sm:flex-row  sm:absolute sm:top-8  
          text-left   space-x-5   absolute sm:right-10 right-[1px]  mt-[-24px] items-baseline py-10 sm:py-0 hover:transition-all transition duration-[500] ease-in
          ${
            open
              ? " top-20 opacity-100 sm:opacity-100 bg-black g w-[100vw] space-y-10 z-50"
              : " top-[-500px] opacity-100 sm:opacity-100"
          } `}
          >
            <Link to="/ " className="no-underline">
              <li className="text-white ml-5 ">Home</li>
            </Link>

            {!localStorage.getItem("usertoken") ? (
              <Link to="/login" className="no-underline">
                <li className="text-white ">Login</li>
              </Link>
            ) : (
              <button className="text-white " onClick={handleLogOut}>
                Logout
              </button>
            )}

            <Link to="/cart" className="no-underline">
              <li className="text-white ">Cart</li>
            </Link>
            <li className="text-white  h-[45px] w-[45px] relative ">
              <ion-icon name="cart"></ion-icon>
              <div className="text-white bg-black rounded-full h-5 w-[22px]   absolute bottom-8 right-3  box-decoration-clone">
                <span className="absolute bottom-[-1px] left-[4px] lining-nums text-sm">
                  {data.data?.length || 0}
                  {/* {localStorage.getItem('itemNo')} */}
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
