import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productActions";
// import { addToCart } from "../store/CartSlice";
import "react-toastify/dist/ReactToastify.css";

const Product = () => {
  const { data: products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    // eslint-disable-next-line
  }, [products]);

  // const { userToken } = useSelector((state) => state.user);
  // import axios from "axios";
  // var URL = "http://localhost:5000/api/cart/addproductincart";
  // const handleAdd = (item, itemtoastify) => {
  //   if (userToken) {
  //     //for notification
  //     toast.success(`${itemtoastify} added to cart 👍`);
  //     //for add product in redux store and then in cart in frontend
  //     dispatch(addToCart(item));
  //     //for backend
  //     const response = axios
  //       .post(
  //         URL,
  //         {},
  //         {
  //           //remember headers should always be in third parameter
  //           headers: {
  //             "auth-token": JSON.parse(localStorage.getItem("usertoken")),
  //           },
  //         }
  //       )
  //       .then((res) => console.log(res, "No Error"))
  //       .catch((err) => console.log(err, " Axios Server error"));
  //     console.log(response);
  //   } else {
  //     toast.warn("You need to login first");
  //   }
  // };

  // const notify = (itemId) => toast.success(`${itemId}  added to cart`);

  return (
    <div className=" sm:ml-6 mt-8 md:mx-8 grid justify-items-center md:block">
      <div
        className=" flex flex-col sm:grid sm:grid-cols-2 sm:gap-1 md:grid md:grid-cols-3 md:gap-4 
         lg:grid lg:grid-cols-4 lg:gap-1 xl:grid xl:grid-cols-5 xl:gap-7 2xl:grid 2xl:grid-cols-5 2xl:gap-1  "
      >
        {products.data?.map((item) => (
          <div
            className=" bg-white w-[270px] md:w-[250px] lg:w-[250px] xl:w-[250px] 
            mb-4 h-auto shadow-md shadow-gray-400 text-black mx-4 hover:shadow-xl
             hover:shadow-gray-600 hover:transition-all transition duration-[500] ease-in pb-2"
            key={item._id}
          >
            <Link to={`/viewproduct/${item._id}`}>
              <img
                src={item.imgurl}
                alt=""
                className="w-[270px] h-[300px] mt-4 px-4"
              />
            </Link>
            <h5 className="mt-4 ml-4 text-gray-400">{item.name}</h5>
            <p className=" ml-4 mr-3 text-lg">{item.desc}</p>
            <h6 className="ml-4 ">&#8377;{item.rate}</h6>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
