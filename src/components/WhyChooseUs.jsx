import { motion } from "framer-motion";

const WhyChooseUs = () => {
  const features = [
    {
      icon: "🏡",
      title: "Verified Properties",
      desc: "All listings are verified to ensure safe and trusted rental experience.",
    },
    {
      icon: "⚡",
      title: "Fast Booking System",
      desc: "Easy and quick booking process with secure online payments.",
    },
    {
      icon: "🔒",
      title: "Secure Platform",
      desc: "Your data and transactions are fully protected with secure authentication.",
    },
  ];

  return (
    <div className="py-16 px-4 bg-[#0b1220]">

      {/* TITLE */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[#d6b46d]">
          Why Choose Us
        </h2>

        <p className="text-gray-400 mt-3 max-w-xl mx-auto">
          We provide the best rental experience for tenants and property owners
        </p>
      </motion.div>

      {/* CARDS */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

        {features.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.07 }}
            transition={{ duration: 0.3 }}
            className="relative bg-[#111827] border border-[#d6b46d]/30 p-7 rounded-2xl shadow-lg overflow-hidden group"
          >

            {/* glow background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#d6b46d]/10 to-transparent opacity-20 group-hover:opacity-40 transition"></div>

            <div className="relative z-10 text-center">

              <div className="text-5xl mb-4">{item.icon}</div>

              <h3 className="text-xl font-bold text-white mb-3">
                {item.title}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed">
                {item.desc}
              </p>

            </div>

          </motion.div>
        ))}

      </div>
    </div>
  );
};

export default WhyChooseUs;