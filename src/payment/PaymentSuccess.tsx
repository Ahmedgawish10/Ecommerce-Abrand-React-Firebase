import { useEffect, useState, useTransition } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../config/Firebase";
import { clearCart } from "../store/carts/action/CartsActs";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addToOrders } from './../store/orders/UserOrdersSlice';

const SuccessPage = () => {
  const location = useLocation();
  const [paymentStatus, setPaymentStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const query = new URLSearchParams(location.search);
  const sessionId = query.get("session_id");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isPending, startTransition] = useTransition();
  const {cart}=useAppSelector((state)=>state.cart)
  const {orders}=useAppSelector((state)=>state.order)

  useEffect(() => {
    const trimmedSessionId = sessionId?.replace(/"/g, '').slice(0, -5);
    
    if (!sessionId) {
      navigate("/", { replace: true });
    }
    if (sessionId) {
      const fetchSession = async () => {
        try {
          // https://testpayment-liart.vercel.app 
          // http://localhost:5000
          const response = await fetch(`https://testpayment-liart.vercel.app/session/${trimmedSessionId}`);
          const data = await response.json();

          if (data && data.payment_status === "paid") {
            setPaymentStatus("Payment successful!");
            
            if (auth?.currentUser?.uid) {
               let orderUser:any=[...cart];
              if (cart.length > 0) {                
                dispatch(addToOrders({order:orderUser,orderId:data.payment_intent}));
              }
              dispatch(clearCart(auth?.currentUser?.uid));
            }
          } else {
            setPaymentStatus("Payment failed.");
          }
        } catch (error) {
          console.error("Error fetching session:", error);
          setPaymentStatus("An error occurred.");
        } finally {
          setLoading(false);
        }
      };

      fetchSession();
    }
  }, [sessionId, auth.currentUser, dispatch,cart]);

  return (
    <div>
      {loading ? (
        <p className="h-[90vh]">Loading...</p>
      ) : (
        <div className=" h-screen pt-5">
          <div className=" p-6 md:mx-auto md:w-[300px] bg-white">
            <svg
              viewBox="0 0 24 24"
              className="text-green-600 w-16 h-16 mx-auto my-6"
            >
              <path
                fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
              ></path>
            </svg>
            <div className="text-center">
              <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                Payment Done!
              </h3>
              <p className="text-gray-600 my-2">
                Thank you for completing your secure online payment.
              </p>
              <p>Have a great day!</p>
              <div className="py-10 text-center">
                <button
                  onClick={() =>
                    startTransition(() => {
                      navigate("/",{replace:true});
                    })
                  }
                  className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
                >
                  GO Home
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessPage;
