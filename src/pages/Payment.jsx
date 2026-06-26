import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation, Navigate } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(

  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY

);

const Payment = () => {
  const location = useLocation();

  if (!location.state?.clientSecret) {
    return <Navigate to="/properties" replace />;
  }

  return (

<div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4 py-10">

 <Elements

stripe={stripePromise}
 options={{
 clientSecret: location.state.clientSecret,
   appearance: {
  theme: "night",

 },

 }}

>

<CheckoutForm />

      </Elements>
      
    </div>
  );
};

export default Payment;