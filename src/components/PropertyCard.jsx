import { useNavigate } from "react-router-dom";

const PropertyCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div className="group bg-[#0b1220] border border-[#1f2937] rounded-xl p-4 hover:border-[#d6b46d] transition-all duration-300 hover:scale-[1.03] shadow-lg">

      {/* IMAGE */}
      <div className="h-44 bg-gradient-to-br from-[#0f2f2f] to-[#111827] rounded-lg mb-4 flex items-center justify-center text-gray-400 overflow-hidden">
        <span className="text-sm group-hover:text-[#d6b46d] transition">
          No Image
        </span>
      </div>

      {/* TITLE */}
      <h3 className="text-lg font-bold text-white group-hover:text-[#d6b46d] transition">
        {item.title}
      </h3>

      {/* LOCATION */}
      <p className="text-gray-400 text-sm mt-1">
        📍 {item.location}
      </p>

      {/* TYPE */}
      <span className="text-xs bg-[#d6b46d] text-black px-3 py-1 rounded-full inline-block mt-3 font-medium">
        {item.propertyType}
      </span>

      {/* PRICE */}
      <p className="mt-4 text-[#d6b46d] font-bold text-lg">
        ৳ {item.price}
        <span className="text-gray-400 text-sm font-normal"> / {item.rentType}</span>
      </p>

      {/* BUTTON */}
      <button
        onClick={() => navigate(`/property/${item._id}`)}
        className="mt-5 w-full py-2 rounded-lg bg-[#0f2f2f] border border-[#d6b46d] text-[#d6b46d] font-semibold 
        hover:bg-[#d6b46d] hover:text-black transition-all duration-300 active:scale-95"
      >
        View Details →
      </button>

    </div>
  );
};

export default PropertyCard;