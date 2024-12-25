import React, { useEffect, useState, useMemo, startTransition } from "react";
import { useAppDispatch } from "../../store/hooks";
import { useAppSelector } from "../../store/hooks";
import { auth } from "../../config/Firebase";
import { fetchUserCart } from "../../store/carts/action/CartsActs";
import { addToCart, removeFromCart } from "../../store/carts/action/CartsActs";

import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import BtnChekout from "../../payment/Payment";
import { Link } from "react-router-dom";

const Carts = () => {  

  const stripePromise = useMemo(() =>    
    loadStripe("pk_test_51P85jmLPTeuzPbczFv563xXzD8vLfogDI4a5rmuv2tmTIIOvZL3NAcDFgdSwSUHmT0y4HavsoX2Fhb5Njdl1czWK00UvlNxkGf")

  ,[]);

  const dispatch = useAppDispatch();
  const { cart, status, error } = useAppSelector((state) => state.cart);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const userId = auth?.currentUser?.uid;
    if (userId) {
      startTransition(() => {
   
        
        dispatch(fetchUserCart(userId)); 
      });
    }
  }, [dispatch, auth?.currentUser?.uid]);

  const handleAddToCart=(product:any)=>{
    if (auth.currentUser?.uid) {          
      dispatch(addToCart({userId: auth.currentUser.uid, product}));
    } else {
      toast.error("Please log in first to add to the cart.");
            }
   }
   const handleDecreaseOrRemoveFromCart=(product:any)=>{
    if (auth.currentUser?.uid) {          
      dispatch(removeFromCart({userId: auth.currentUser.uid, product}));
    } else {
      toast.error("Please log in first to add to the cart.");
            }
   }


const [totalAmount,setTotalAmount]=useState<number>(0)
   const calculateTotal = () => {
    const subtotal = cart.reduce( (sum, item) => sum + +(item.price ?? 0) * +item.quantity,  0 );
    const taxes = 2; 
    const shipping = 0;
    const total = subtotal + taxes + shipping;    
    setTotalAmount(+total?.toFixed(2)); 
  };

  // Recalculate the total whenever the cart changes
  useEffect(() => {
    calculateTotal();
  }, [cart]);
  return (
    <div>
      <div className="container mx-auto" id="cart">
        <div className="py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
            {cart.length >= 1 ? (
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-3/4 overflow-auto">
                  <div className="overflow-x-auto bg-[#111827] rounded-lg shadow-md xs:w-[500px] sm:p-0 md:p-6 mb-4">
                    <div className="flex font-semibold border-b pb-2">
                      <div className="flex-1">Product</div>
                      <div className="flex-1">Price</div>
                      <div className="flex-1">Quantity</div>
                      <div className="flex-1 text-center">Total</div>
                    </div>
                    {cart.map((item, index) => (
                      <div key={index} className="flex items-center py-4 border-b">
                        <div className="flex-1 flex flex-col">
                          <img
                            className="h-16 w-16 mr-4"
                            src={item.imageUrl}
                            alt="Product"
                          />
                          <div className="font-semibold">{item.name}</div>
                        </div>
                        <div className="flex-1">${item.price}</div>
                        <div className="flex-1 flex items-center">
                          <button className="border rounded-md py-2 px-4 mr-2" onClick={()=>handleDecreaseOrRemoveFromCart(item)}>-</button>
                          <span className="text-center w-8">{item.quantity}</span>
                          <button className="border rounded-md py-2 px-4 ml-2" onClick={()=>handleAddToCart(item)}>+</button>
                        </div>
                        <div className="flex-1 text-center">
                          ${(item.price ?? 0) * item.quantity}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="md:w-1/4">
                  <div className="bg-[#111827] rounded-lg shadow-md p-6">
                    <h2 className="text-lg font-semibold mb-4">Summary</h2>
                    <div className="flex justify-between mb-2">
                      <span>Subtotal</span>
                      <span>
                        ${(
                          cart.reduce(
                            (sum, item) => sum + +(item.price ?? 0) * +item.quantity,
                            0
                          )
                        ).toFixed(0)}
                      </span>
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
                      <span className="font-semibold">
                        ${(cart.reduce(
                            (sum, item) => sum + +(item.price ?? 0) * +item.quantity,
                            0
                          ) + 1.99
                        ).toFixed(0)}
                      </span>
                    </div>
                    <Elements stripe={stripePromise}>
                      <BtnChekout amount={totalAmount} />
                    </Elements>
                  </div>
                </div>
              </div>
            ) : (
              <div>
              <p>   Cart is empty     </p>
               <button className=" mt-5 bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md mr-6 xs:mr-2">
                <Link to="/" replace={true}>
                  Home
                </Link>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carts;
