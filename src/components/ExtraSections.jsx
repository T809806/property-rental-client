const ExtraSections = () => {
  const locations = [
    "Dhaka",
    "Chattogram",
    "Sylhet",
    "Khulna",
    "Rajshahi",
    "Cox's Bazar",
  ];

  const stats = [
    { label: "Total Properties", value: "120+" },
    { label: "Happy Tenants", value: "500+" },
    { label: "Verified Owners", value: "80+" },
    { label: "Monthly Bookings", value: "200+" },
  ];

  return (
    <div className="bg-[#0b0f14] py-20 px-6">

      {/* ================= TOP LOCATIONS ================= */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-[#d6b46d]">
          Top Locations
        </h2>
        <p className="text-gray-400 mt-2">
          Popular cities for rental properties
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-20">
        {locations.map((item, index) => (
          <div
            key={index}
            className="px-6 py-3 bg-[#111827] border border-[#d6b46d] rounded-full text-gray-200 hover:bg-[#d6b46d] hover:text-black transition"
          >
            {item}
          </div>
        ))}
      </div>

      {/* ================= RENTAL STATS ================= */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-[#d6b46d]">
          Rental Statistics
        </h2>
        <p className="text-gray-400 mt-2">
          Platform performance overview
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-[#111827] border border-[#d6b46d] p-6 rounded-xl text-center hover:scale-105 transition"
          >
            <h3 className="text-3xl font-bold text-[#d6b46d]">
              {item.value}
            </h3>
            <p className="text-gray-400 mt-2">
              {item.label}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ExtraSections;