import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { useAppSelector } from "../../store/hooks";
import { auth } from "../../config/Firebase";
import { fetchUserCart } from "../../store/carts/action/CartsActs";
import { addToCart, removeFromCart } from "../../store/carts/action/CartsActs";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import toast from "react-hot-toast";

const Carts = () => {
  const [toggleCart, setToggleCart] = useState(false);
  const dispatch = useAppDispatch();
  const { cart, status, error } = useAppSelector((state) => state.cart);
  useEffect(() => {
    const userId = auth?.currentUser?.uid;    
    if (userId) {      
        dispatch(fetchUserCart(userId))
      
    }
  }, [dispatch,auth?.currentUser?.uid]);

  // useEffect(() => {
  //   const productExists = cart.some((product) => product.id === productProps.id);
  //   setToggleCart(productExists);
  // }, [cart]);

  // const handleToggleCart = () => {
  //   const userId = auth?.currentUser?.uid;
  //   if (userId) {
  //     if (toggleCart) {
  //       dispatch(removeFromCart({ userId, product: productProps }));
  //       toast.error(`${productProps.name} removed from cart`);
  //     } else {
  //       dispatch(addToCart({ userId, product: productProps }));
  //       toast.success(`${productProps.name} added to cart`);
  //     }
  //     setToggleCart(!toggleCart);
  //   } else {
  //     console.error("User is not logged in");
  //   }
  // };
  return (
    <div>
      <div className="container mx-auto">
        <div className="py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
            {cart.length>=1?<div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-3/4 overflow-auto">
                <div className=" overflow-x-auto bg-[#111827] rounded-lg shadow-md xs:w-[500px] sm:p-0 md:p-6 mb-4">
                  <div className="flex font-semibold border-b pb-2">
                    <div className="flex-1">Product</div>
                    <div className="flex-1">Price</div>
                    <div className="flex-1">Quantity</div>
                    <div className="flex-1 text-center">Total</div>
                  </div>
                  {cart.map((item, index) => (
                    <div key={index} className="flex items-center py-4 border-b">
                      <div className="flex-1 flex flex-col ">
                        <img
                          className="h-16 w-16 mr-4"
                          src={item.imageUrl}
                          alt="Product"
                        />
                        <div className="font-semibold">{item.name}</div>
                      </div>
                      <div className="flex-1">{item.price}</div>
                      <div className="flex-1 flex items-center">
                        <button className="border rounded-md py-2 px-4 mr-2">-</button>
                        <span className="text-center w-8">{item.quantity}</span>
                        <button className="border rounded-md py-2 px-4 ml-2">+</button>
                      </div>
                      <div className="flex-1 text-center">{(item.price??0) * item.quantity}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:w-1/4">
                <div className="bg-[#111827] rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold mb-4">Summary</h2>
                  <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span> {(
                        cart.reduce((sum, item) => sum + +(item.price??0) * +item.quantity, 0)
                      ).toFixed(0)}</span>
                   
                                      </div>
                  <div className="flex justify-between mb-2">
                    <span>Taxes</span>
                    <span>$1.99</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Shipping</span>
                    <span>$0.00</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold">   $
                      {(
                        cart.reduce((sum, item) => sum + +(item.price??0) * +item.quantity, 0)+1.99
                      ).toFixed(0)}</span>
                    
                  </div>
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">
                    Checkout
                  </button>
                </div>
              </div>
            </div>:"Cart is empty"}
            
          </div>
        </div>
      </div>
    </div>
  );
  
};
export default Carts;
