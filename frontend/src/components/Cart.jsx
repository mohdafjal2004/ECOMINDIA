import { useEffect, useState, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteCartProducts, getCartProducts } from "../store/cartActions";

const Cart = () => {
  const product = useSelector((state) => state.cart.cart);
  const { cart } = useSelector((state) => state.cart);
  console.log(product.data, "Line 11");

  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.user);

  const handleRemove = (item, itemtoastify) => {
    toast.success(`${itemtoastify} removed from  cart`);
    window.location.reload(false);
    dispatch(deleteCartProducts(item));
  };
  //get products from backend
  // const getProducts = async () => {
  //   try {
  //     const response = await axios.get(`${URL}cart/getcartproduct`, {
  //       headers: {
  //         "auth-token": JSON.parse(localStorage.getItem("usertoken")),
  //       },
  //     });
  //     setData(response.data);

  //     console.log(response.data.length);
  //   } catch (error) {
  //     console.log("Server Error");
  //   }
  // };

  // const itemNo = () =>
  //   localStorage.setItem("itemNo", JSON.stringify(products.data.length));

  useEffect(() => {
    // getProducts();
    //? dispatching the getCartProducts() will automatically update the number of items in cart.jsx and navbar.jsx
    if (userToken) {
      dispatch(getCartProducts());
    }

    // eslint-disable-next-line
  }, []);

  return (
    <div className="ml-16 sm:ml-6 mt-8 md:mx-8 absolute top-10 grid justify-items-stretch">
      <header className="text-2xl md:text-4xl  my-10 justify-self-center">
        {/* For defining number of items in cart */}
        {!localStorage.getItem("usertoken")
          ? "You need to login first "
          : "Number of Items in Cart : " + product.data?.length}
        {/* For defining number of items in  localStorage */}
      </header>
      <span className="text-4xl text-red-500">
        {product.data?.length === 0 ? "No Items Found 🤷‍♂️" : ""}
      </span>
      <div
        className=" flex flex-col sm:grid sm:grid-cols-2 sm:gap-1 md:grid md:grid-cols-3 md:gap-4 
        lg:grid lg:grid-cols-4 lg:gap-1 xl:grid xl:grid-cols-5 xl:gap-7 2xl:grid 2xl:grid-cols-5 2xl:gap-4  "
      >
        {product.data?.map((item) => (
          <div
            className=" bg-white w-[270px] md:w-[250px] lg:w-[250px] xl:w-[250px] 
            mb-4 h-auto shadow-md shadow-gray-400 text-black"
            key={item._id}
          >
            {/* Can't do mapping as productId is a object not an array */}
            <img
              src={item.productId.imgurl}
              alt=""
              className="w-[270px] h-[300px] mt-4 px-4"
            />
            <h5 className="mt-4 ml-4 text-gray-400">{item.productId.name}</h5>
            <p className=" ml-4 mr-3 text-lg">{item.productId.desc}</p>
            <h6 className="ml-4 ">&#8377;{item.productId.rate}</h6>
            <h4 className="ml-4 ">Quantity :{item.count}</h4>
            <button
              className="border-2 px-2 mb-4 w-[240px] md:w-[200px] h-11 mx-3 mt-2 py-[-8px]"
              onClick={() => {
                handleRemove(item._id, item.productId.name);
              }}
            >
              Remove from Cart <span className="text-2xl">😦</span>
            </button>
            <ToastContainer position="bottom-right" autoClose={1000} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
