import { useEffect, useState } from "react";
import api from "../api/axios";
import WhyChooseUs from "../components/WhyChooseUs";
import Reviews from "../components/Reviews";
import ExtraSections from "../components/ExtraSections";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

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
    <div className="bg-[#050b14] text-white">

      {/* ================= HERO ================= */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative h-[520px] flex items-center justify-center text-center px-4"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/75"></div>

        <div className="relative z-10 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-[#d6b46d] mb-4">
            Discover Luxury Rental Homes
          </h1>

          <p className="text-gray-300 text-lg mb-8">
            Premium properties for modern living. Find your perfect home easily.
          </p>

          {/* SEARCH BOX */}
          <div className="bg-[#0b1220]/80 backdrop-blur-md border border-[#1f2937] p-5 rounded-2xl grid grid-cols-1 md:grid-cols-5 gap-3">

            <input className="p-3 rounded-lg bg-[#0f172a] border border-gray-700 text-white focus:border-[#d6b46d] outline-none" placeholder="Location" />
            <input className="p-3 rounded-lg bg-[#0f172a] border border-gray-700 text-white focus:border-[#d6b46d] outline-none" placeholder="Property Type" />
            <input className="p-3 rounded-lg bg-[#0f172a] border border-gray-700 text-white focus:border-[#d6b46d] outline-none" placeholder="Min Price" />
            <input className="p-3 rounded-lg bg-[#0f172a] border border-gray-700 text-white focus:border-[#d6b46d] outline-none" placeholder="Max Price" />

            <button className="bg-[#d6b46d] text-black font-bold rounded-lg hover:scale-105 transition">
              Search
            </button>

          </div>
        </div>
      </motion.section>

      {/* ================= FEATURED TITLE ================= */}
      <div className="py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#d6b46d] mb-2">
          Featured Properties
        </h2>
        <p className="text-gray-400">
          Handpicked premium listings for you
        </p>
      </div>

      {/* ================= PROPERTIES ================= */}
      <div className="px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-6">

          {properties.length > 0 ? (
            properties.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ scale: 1.05 }}
                className="bg-[#0b1220] border border-[#1f2937] rounded-xl p-5 hover:border-[#d6b46d] transition"
              >

                {/* IMAGE */}
                <img
                  src={
                    item.images?.[0] ||
                    "https://plus.unsplash.com/premium_photo-1684175656320-5c3f701c082c?w=600"
                  }
                  className="h-40 w-full object-cover rounded-lg mb-4"
                />

                {/* TITLE */}
                <h3 className="text-xl font-bold text-white">
                  {item.title}
                </h3>

                {/* LOCATION */}
                <p className="text-gray-400 text-sm">
                  📍 {item.location}
                </p>

                {/* TYPE */}
                <span className="inline-block mt-2 text-xs bg-[#d6b46d] text-black px-2 py-1 rounded-full">
                  {item.propertyType}
                </span>

                {/* PRICE */}
                <p className="mt-3 text-[#d6b46d] font-bold">
                  ৳ {item.price}
                </p>

                {/* BUTTON */}
                <button
                  onClick={() => handleViewDetails(item._id)}
                  className="mt-4 w-full py-2 rounded-lg bg-[#0f2f2f] border border-[#d6b46d] text-[#d6b46d]
                  hover:bg-[#d6b46d] hover:text-black transition-all duration-300 active:scale-95"
                >
                  View Details →
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

      {/* ================= EXTRA SECTIONS ================= */}
      <div className="space-y-24 pb-20">

        <WhyChooseUs />

        <Reviews />

        <ExtraSections />

      </div>

    </div>
  );
};

export default Home;