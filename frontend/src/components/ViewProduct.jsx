import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { addProduct, getCartProducts } from "../store/cartActions";
import { addToCart } from "../store/CartSlice";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

var url = "https://ecomindbackend.herokuapp.com/api/";

const ViewProduct = () => {
  const { productId } = useParams();
  // console.log(productId);
  const { userToken } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  //useState for changing state of entire page from nothing to getting product details using useParams
  const [item, setItem] = useState({});

  //useState for changing state of dropdown list
  const [count, setCount] = useState(1);

  //! FetchProduct By id using dynamic routing(useParams of react-router-dom)
  const fetchDetailsById = async () => {
    try {
      const { data } = await axios.get(`${url}product/byid/_${productId}`);
      setItem(data);
    } catch (error) {
      console.log("Server error", error);
    }
  };

  useEffect(() => {
    fetchDetailsById();
    // eslint-disable-next-line
  }, []);

  const handleAdd = () => {
    if (userToken) {
      //for notification
      toast.success(`${item.name} added to cart 👍`);
      //for add product in redux store and then in cart in frontend
      dispatch(addProduct({ productId, count }));

      //for backend
      // const response = axios
      //   .post(
      //     URL,
      //     { productId, count },
      //     {
      //       //remember headers should always be in third parameter
      //       headers: {
      //         "auth-token": JSON.parse(localStorage.getItem("usertoken")),
      //       },
      //     }
      //   )
      //   .then((res) => console.log(res, "No Error"))
      //   .catch((err) => console.log(err, " Axios Server errordee"));
    } else {
      toast.warn("You need to login first");
    }
  };

  const handleSelect = (e) => {
    setCount(count + 1);
  };
  return (
    <div className="absolute top-28 mx-10  ">
      <div className="flex-col md:grid grid-cols-4 gap-4 mb-10">
        <div className="md:min-w-full">
          <img
            src={item.imgurl}
            alt=""
            className="border-2  bg-slate-500 h-fit md:min-w-[100%]  sm:min-h-[100%]"
          />
          <div className=" flex justify-around h-auto space-x-1  sm:static fixed bottom-0 w-full right-0 ">
            <div className=" px-2 bg-pink-400 w-1/2 h-10  flex items-center justify-center space-x-1 ">
              <span className="overflow-hidden">Quantity:</span>
              <h2>{count}</h2>
              <button onClick={handleSelect} className="border-2 w-5 h-auto">
                +
              </button>
            </div>
            <div className=" h-10 bg-orange-400 w-1/2 flex items-center justify-center space-x-1 ">
              <button
                onClick={() => handleAdd(item, item.name)}
                className="hover:text-white"
              >
                <Link to="/cart">Add to cart</Link>
              </button>
              <ion-icon name="cart"></ion-icon>
            </div>
          </div>
        </div>
        <div className=" col-span-3  sm:ml-4 w-auto px-3 mt-10 md:mt-2 space-y-2">
          <h2 className="text-[20px] text-gray-500">{item.name}</h2>
          <h5 className="text-base  mt-[-5px]">{item.desc}</h5>
          <div className="flex">
            <p className="text-sm mr-1"> Price: </p>
            <p>
              <span className="text-xl text-red-700 font-semibold ">
                &#8377;{item.rate}
              </span>
            </p>
          </div>
          <p className="text-xs  my-[10px]  ml-8">Inclusive of all taxes</p>
          <h4 className="text-2xl">Product description</h4>
          <p className="mt-[-4px] sm:w-[490px]  text-sm md:text-xl font-semibold">
            {item.description}
          </p>

          <ul className=" text-sm z-[10]">
            <li>Care Instructions: Machine Wash</li>
            <li>Fit Type: Slim Fit</li>
            <li>Color Name: Grey</li>
            <li>Material: Cotton</li>
            <li>Long Sleeve</li>
            <li>Regular Machine Wash With Like Colors</li>
            <li>Closure Type: Button; Collar Style: Spread</li>
          </ul>
        </div>
        <div></div>
      </div>
      <ToastContainer position="bottom-right" autoClose={1000} />
    </div>
  );
};

export default ViewProduct;
