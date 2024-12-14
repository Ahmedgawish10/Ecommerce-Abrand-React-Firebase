
import { loadStripe } from "@stripe/stripe-js";
import { auth } from "../config/Firebase";

// Type for the component props
interface CheckoutBtnProps {
  products: any;
}

const CheckoutBtn = () => {
  const publishableKey = "pk_test_51P85jmLPTeuzPbczFv563xXzD8vLfogDI4a5rmuv2tmTIIOvZL3NAcDFgdSwSUHmT0y4HavsoX2Fhb5Njdl1czWK00UvlNxkGf";
  const stripePromise = loadStripe(publishableKey);

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    if (!stripe) {
      console.error("Stripe.js failed to load.");
      return;
    }

    const response = await fetch("https://backend-stripe-37k1j6pol-ahmedgawish.vercel.app/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: 8000, currency: "usd" }), // Example: $10
    });

    const { sessionId } = await response.json();  
    const result = await stripe?.redirectToCheckout({
      sessionId: sessionId,  
    });

    if (result?.error) {
      window.alert(result?.error?.message);
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
