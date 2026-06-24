import { useEffect } from "react";
import api from "../api/axios";
import { useSearchParams } from "react-router-dom";

const Success = () => {
  const [params] = useSearchParams();
  const bookingId = params.get("bookingId");

  useEffect(() => {
    const confirmBooking = async () => {
      try {
        await api.patch(`/bookings/${bookingId}`, {
          status: "Approved",
          paymentStatus: "Paid",
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (bookingId) confirmBooking();
  }, [bookingId]);

  return (
    <div className="text-center mt-20 text-green-500 text-2xl">
      Payment Successful 🎉
    </div>
  );
};

export default Success;