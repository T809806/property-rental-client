import { motion } from "framer-motion";

const Reviews = () => {
  const reviews = [
    {
      name: "Ahana",
      rating: 5,
      comment: "Very smooth booking process. Highly recommended!",
    },
    {
      name: "Imran",
      rating: 4,
      comment: "Good platform. Found a nice apartment easily.",
    },
    {
      name: "Nayem",
      rating: 5,
      comment: "Safe and trusted rental system. Loved it!",
    },
    {
      name: "Nabila",
      rating: 5,
      comment: "Excellent UI and fast response from owners.",
    },
  ];

  return (
    <div className="py-16 px-4 bg-[#0b1220]">

       <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
   >

 <h2 className="text-3xl md:text-4xl font-bold text-[#d6b46d]"> Customer Reviews </h2>
 <p className="text-gray-400 mt-3"> What our tenants say about us  </p>

 </motion.div>

   <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">

     {reviews.map((r, index) => (
       <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="relative bg-[#111827] border border-[#d6b46d]/30 p-6 rounded-xl shadow-lg overflow-hidden"
   >

 <div className="absolute inset-0 bg-gradient-to-br from-[#d6b46d]/10 to-transparent opacity-20"></div>

   <div className="relative z-10">

     <h3 className="text-white font-bold mb-2"> {r.name} </h3>
     <p className="text-[#d6b46d] mb-3 text-lg"> {"★".repeat(r.rating)} </p>
     <p className="text-gray-400 text-sm leading-relaxed"> {r.comment} </p>

 </div>

 </motion.div>

   ))}

 </div>

 </div>

  );
};

export default Reviews;