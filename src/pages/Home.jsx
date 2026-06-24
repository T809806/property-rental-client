import { useEffect, useState } from "react";
import api from "../api/axios";
import WhyChooseUs from "../components/WhyChooseUs";
import Reviews from "../components/Reviews";
import ExtraSections from "../components/ExtraSections";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate(); // 🔥 FIXED (missing before)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await api.get("/properties/featured");
        setProperties(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProperties();
  }, []);

  const handleViewDetails = (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    navigate(`/property/${id}`);
  };

  return (
    <div className="bg-black min-h-screen">

      {/* ================= HERO / BANNER ================= */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative h-[520px] flex items-center justify-center text-center px-4"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-[#d6b46d] mb-4">
            Discover Luxury Rental Homes
          </h1>

          <p className="text-gray-200 text-lg mb-8">
            Premium properties for modern living experience. Find your perfect home easily.
          </p>

          {/* SEARCH BOX */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl grid grid-cols-1 md:grid-cols-5 gap-3">

            <input className="p-3 rounded bg-black/30 border border-gray-500 text-white" placeholder="Location" />
            <input className="p-3 rounded bg-black/30 border border-gray-500 text-white" placeholder="Property Type" />
            <input className="p-3 rounded bg-black/30 border border-gray-500 text-white" placeholder="Min Price" />
            <input className="p-3 rounded bg-black/30 border border-gray-500 text-white" placeholder="Max Price" />

            <button className="bg-[#d6b46d] text-black font-bold rounded hover:opacity-90 transition">
              Search
            </button>

          </div>
        </div>
      </motion.div>

      {/* ================= FEATURE TITLE ================= */}
      <div className="py-16 text-center">
        <h2 className="text-3xl font-bold text-[#d6b46d] mb-2">
          Featured Properties
        </h2>
        <p className="text-gray-400">
          Handpicked premium listings for you
        </p>
      </div>

      {/* ================= PROPERTY CARDS (MOVED HERE CORRECTLY) ================= */}
      <div className="px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-6">

          {properties.length > 0 ? (
            properties.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-[#111827] border border-[#d6b46d] rounded-xl p-5"
              >

                {/* IMAGE FIX */}
                <img
                  src={
                    item.images?.[0] ||
                    "https://plus.unsplash.com/premium_photo-1684175656320-5c3f701c082c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXBhcnRtZW50c3xlbnwwfHwwfHx8MA%3D%3D"
                  }
                  alt="property"
                  className="h-40 w-full object-cover rounded-lg mb-4"
                />

                <h3 className="text-xl font-bold text-white mb-1">
                  {item.title}
                </h3>

                <p className="text-gray-400 text-sm mb-2">
                  {item.location}
                </p>

                <span className="text-xs bg-[#d6b46d] text-black px-2 py-1 rounded">
                  {item.propertyType}
                </span>

                <p className="mt-3 text-[#d6b46d] font-semibold">
                  ৳{item.price}
                </p>

                <button
                  onClick={() => handleViewDetails(item._id)}
                  className="mt-4 w-full bg-[#0f2f2f] border border-[#d6b46d] text-[#d6b46d] py-2 rounded hover:bg-[#d6b46d] hover:text-black transition"
                >
                  View Details
                </button>

              </motion.div>
            ))
          ) : (
            <p className="text-gray-400 col-span-3 text-center">
              No properties found
            </p>
          )}

        </div>
      </div>

      {/* ================= EXTRA SECTIONS (CORRECT ORDER) ================= */}
      <WhyChooseUs />
      <Reviews />
      <ExtraSections />

    </div>
  );
};

export default Home;