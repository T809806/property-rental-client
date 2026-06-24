import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const BookingModal = ({ property, user, onClose }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    moveInDate: "",
    contactNumber: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBooking = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.post(
        "/bookings",
        {
          propertyId: property._id,
          userId: user?._id,
          ...form,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Booking Successful");

      // redirect to payment page
      navigate("/payment");
    } catch (error) {
      console.log(error);
      alert("Booking failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
      <div className="bg-[#111827] p-6 rounded w-[400px] text-white">

        <h2 className="text-xl mb-4 text-[#d6b46d]">
          Book Property
        </h2>

        <input
          name="moveInDate"
          type="date"
          onChange={handleChange}
          className="w-full p-2 mb-3 bg-black"
        />

        <input
          name="contactNumber"
          placeholder="Contact Number"
          onChange={handleChange}
          className="w-full p-2 mb-3 bg-black"
        />

        <textarea
          name="notes"
          placeholder="Additional Notes"
          onChange={handleChange}
          className="w-full p-2 mb-3 bg-black"
        />

        <button
          onClick={handleBooking}
          className="bg-[#d6b46d] text-black px-4 py-2 w-full"
        >
          Confirm Booking
        </button>

        <button onClick={onClose} className="mt-2 text-red-400">
          Close
        </button>
      </div>
    </div>
  );
};

export default BookingModal;