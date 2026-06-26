import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const BookingModal = ({ property, onClose }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    moveInDate: "",
    contactNumber: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleBooking = async () => {

 if (!form.moveInDate || !form.contactNumber) {
    alert("Please fill all required fields.");
    return;
  }

 try {
      const token = localStorage.getItem("token");
      const payment = await api.post(
   "/payment/create-payment-intent",
   {
   amount: property.price,
   },
   {
   headers: {
   Authorization: `Bearer ${token}`,
   },
  }
  );

 navigate("/payment", {
   state: {
   clientSecret: payment.data.clientSecret,
  property,
   bookingData:form
   },
  });

 } catch (error) {
 console.log(error);
 alert("Unable to proceed to payment");
 }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-[#111827] p-6 rounded-xl w-[400px]">

   <h2 className="text-2xl font-bold text-[#d6b46d] mb-5"> Book Property </h2>

        <input
          type="date"
          name="moveInDate"
          value={form.moveInDate}
          onChange={handleChange}
          className="w-full p-3 rounded bg-black border border-gray-700 mb-3"
        />

        <input
          type="text"
          name="contactNumber"
          placeholder="Contact Number"
          value={form.contactNumber}
          onChange={handleChange}
          className="w-full p-3 rounded bg-black border border-gray-700 mb-3"
        />

        <textarea
          name="notes"
          placeholder="Additional Notes"
          value={form.notes}
          onChange={handleChange}
          className="w-full p-3 rounded bg-black border border-gray-700 mb-4"
        />

        <button
          onClick={handleBooking}
          className="w-full bg-[#d6b46d] text-black py-3 rounded-lg font-semibold hover:opacity-90"
        >
          Proceed to Payment
        </button>

        <button
          onClick={onClose}
          className="w-full mt-3 border border-red-500 text-red-400 py-3 rounded-lg"
        >
          Close
        </button>

      </div>
    </div>
  );
};

export default BookingModal;