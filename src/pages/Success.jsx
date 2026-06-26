import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const Success = () => {

  return (

    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">
      <div className="bg-[#111827] border border-[#d6b46d] rounded-2xl shadow-xl p-10 max-w-md w-full text-center">

        <CheckCircle
          size={80}
          className="mx-auto text-green-500 mb-6"
        />

 <h1 className="text-3xl font-bold text-[#d6b46d] mb-4">  Payment Successful </h1>

   <p className="text-gray-300 mb-8">
     Your booking has been confirmed successfully.
    Thank you for choosing RentalHub.

 </p>

  <Link
     to="/dashboard"
     className="block w-full bg-[#d6b46d] text-black font-semibold py-3 rounded-lg hover:opacity-90 transition"
 >
    Go To Dashboard

 </Link>

      </div>
      
    </div>
  );
};

export default Success;