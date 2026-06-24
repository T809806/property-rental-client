import { useNavigate } from "react-router-dom";

const Cancel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0b0f14] text-white">
      
      <h1 className="text-3xl font-bold text-red-500">
        Payment Cancelled ❌
      </h1>

      <p className="text-gray-400 mt-3">
        Your payment was not completed.
      </p>

      <button
        onClick={() => navigate(-1)}
        className="mt-6 bg-[#d6b46d] text-black px-6 py-3 rounded font-semibold hover:opacity-90"
      >
        Go Back
      </button>

      <button
        onClick={() => navigate("/")}
        className="mt-3 bg-gray-700 text-white px-6 py-3 rounded hover:bg-gray-600"
      >
        Go Home
      </button>

    </div>
  );
};

export default Cancel;