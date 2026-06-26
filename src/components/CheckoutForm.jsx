import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();
  const location = useLocation();

 const { clientSecret, property, bookingData } = location.state || {};

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    const card = elements.getElement(CardElement);

    const { paymentIntent, error } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
        },
      });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  try {

    // Save Booking
    await api.post(
      "/bookings",
      {
        propertyId: property._id,
        moveInDate: bookingData.moveInDate,
        contactNumber: bookingData.contactNumber,
        notes: bookingData.notes,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Save Transaction
    await api.post(
      "/payment/save",
      {
        transactionId: paymentIntent.id,
        property: property._id,
        tenant: user._id,
        owner: property.owner,
        amount: property.price,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Success Page
    navigate("/success", {
      state: {
        property,
        paymentIntent,
      },
    });

  } catch (err) {
    console.log(err);
   alert("Payment succeeded but failed to save booking/transaction.");
  }
}

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#111827] p-8 rounded-xl border border-[#d6b46d] max-w-lg mx-auto"
    >
      <h2 className="text-2xl text-[#d6b46d] mb-6 font-bold">
        Stripe Payment
      </h2>

      <div className="bg-white rounded p-4">
        <CardElement />
      </div>

      <button
        disabled={!stripe || loading}
        className="w-full mt-6 bg-[#d6b46d] text-black py-3 rounded-lg font-semibold"
      >
        {loading ? "Processing..." : `Pay ৳${property.price}`}
      </button>
    </form>
  );
};

export default CheckoutForm;