import { loadStripe } from "@stripe/stripe-js";
import { auth } from "../config/Firebase";
import axios from "axios";

// Type for the component props
interface CheckoutBtnProps {
  products: any;
}

const CheckoutBtn = () => {
  const publishableKey =
    "pk_test_51P85jmLPTeuzPbczFv563xXzD8vLfogDI4a5rmuv2tmTIIOvZL3NAcDFgdSwSUHmT0y4HavsoX2Fhb5Njdl1czWK00UvlNxkGf";
  const stripePromise = loadStripe(publishableKey);

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    if (!stripe) {
      console.error("Stripe.js failed to load.");
      return;
    }

    try {
      // https://testpayment-liart.vercel.app 
      // http://localhost:5000
      const token = await auth.currentUser?.getIdToken();
      const response = await axios.post("https://testpayment-liart.vercel.app/create-checkout-session",
        {
          amount: 8000, 
          currency: "usd", 
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      console.log(response);
      const { sessionId } = response.data; 

      // Redirect to Stripe checkout
      const result = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (result?.error) {
        window.alert(result.error.message);
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      window.alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="mt-6">
      {auth.currentUser ? (
        <button
          onClick={handleCheckout}
          type="submit"
          className="w-full rounded-md border border-transparent bg-gray-800 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-skyText focus:ring-offset-2 focus:ring-offset-gray-50 duration-200"
        >
          Checkout
        </button>
      ) : (
        <button className="w-full text-base text-white text-center rounded-md border border-transparent bg-gray-500 px-4 py-3 cursor-not-allowed">
          Checkout
        </button>
      )}
      {!auth.currentUser && (
        <p className="mt-2 text-sm font-medium text-red-500 text-center">
          Need to sign in to make checkout
        </p>
      )}
    </div>
  );
};

export default CheckoutBtn;