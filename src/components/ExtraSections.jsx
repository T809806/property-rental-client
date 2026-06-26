import { motion } from "framer-motion";

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
    <div className="py-20 px-4 bg-[#0b1220]">

      {/* ================= TOP LOCATIONS ================= */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-[#d6b46d]">
          Top Locations
        </h2>
        <p className="text-gray-400 mt-2">
          Popular cities for rental properties
        </p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-4 mb-20">

        {locations.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="px-6 py-3 bg-[#111827] border border-[#d6b46d]/30 rounded-full text-gray-200 
            hover:bg-[#d6b46d] hover:text-black transition cursor-pointer shadow-md"
          >
            {item}
          </motion.div>
        ))}

      </div>

      {/* ================= RENTAL STATS ================= */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-[#d6b46d]">
          Rental Statistics
        </h2>
        <p className="text-gray-400 mt-2">
          Platform performance overview
        </p>
      </motion.div>

      <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">

        {stats.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.3 }}
            className="relative bg-[#111827] border border-[#d6b46d]/30 p-7 rounded-2xl text-center shadow-lg overflow-hidden group"
          >

            {/* glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#d6b46d]/10 to-transparent opacity-20 group-hover:opacity-40 transition"></div>

            <div className="relative z-10">

              <h3 className="text-3xl font-bold text-[#d6b46d]">
                {item.value}
              </h3>

              <p className="text-gray-400 mt-2">
                {item.label}
              </p>

            </div>

          </motion.div>
        ))}

      </div>
    </div>
  );
};

export default ExtraSections;