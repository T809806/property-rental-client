import { useNavigate } from "react-router-dom";

const PropertyCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#111827] border border-[#d6b46d] rounded-xl p-5 hover:scale-105 transition">

      {/* IMAGE */}
      <div className="h-40 bg-[#0f2f2f] rounded-lg mb-4 flex items-center justify-center text-gray-400">
        No Image
      </div>

      {/* TITLE */}
      <h3 className="text-xl font-bold text-white">
        {item.title}
      </h3>

      {/* LOCATION */}
      <p className="text-gray-400 text-sm">
        {item.location}
      </p>

      {/* TYPE */}
      <span className="text-xs bg-[#d6b46d] text-black px-2 py-1 rounded inline-block mt-2">
        {item.propertyType}
      </span>

      {/* RENT */}
      <p className="mt-3 text-[#d6b46d] font-semibold">
       ৳{item.price}
      </p>

      {/* BUTTON */}
      <button
        onClick={() => navigate(`/property/${item._id}`)}
        className="mt-4 w-full bg-[#0f2f2f] border border-[#d6b46d] text-[#d6b46d] py-2 rounded hover:bg-[#d6b46d] hover:text-black transition"
      >
        View Details
      </button>

    </div>
  );
};

export default PropertyCard;