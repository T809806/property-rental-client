import { FaFacebookF, FaXTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { motion } from "framer-motion";

const Footer = () => {

 return (

<footer className="bg-[#0b1220] text-white mt-20 border-t border-[#1f2937]">

   <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">

   <div>

  <h2 className="text-2xl font-bold text-[#d6b46d] mb-4"> RentalHub </h2>
 <p className="text-sm text-gray-400 leading-relaxed">
    A trusted property rental platform where tenants and owners connect
    safely and easily. Find your perfect home today.
 </p>

</div>

 <div>

  <h3 className="text-white font-semibold mb-4"> Quick Links </h3>
     <ul className="space-y-2 text-sm text-gray-400">
       {["Home", "All Properties", "Login", "Register"].map((item, i) => (
     <li
       key={i}
        className="hover:text-[#d6b46d] transition cursor-pointer"
     >
       {item}
     </li>
   ))}
 </ul>
 </div>

 <div>
   <h3 className="text-white font-semibold mb-4"> Contact </h3>
   <ul className="space-y-2 text-sm text-gray-400">
    <li> Email: support@rentalhub.com </li>
     <li> Phone: +8801654327895 </li>
     <li> Dhaka, Bangladesh </li>
   </ul>

   </div>

  <div>

   <h3 className="text-white font-semibold mb-4">Follow Us</h3>
   <div className="flex gap-4 text-xl">
       <motion.a
       whileHover={{ scale: 1.2, color: "#d6b46d" }}
       className="p-2 bg-[#111827] rounded-full cursor-pointer text-gray-300"
    >
 <FaFacebookF />
 </motion.a>

 <motion.a
    whileHover={{ scale: 1.2, color: "#d6b46d" }}
   className="p-2 bg-[#111827] rounded-full cursor-pointer text-gray-300"
  >
<FaXTwitter />
 </motion.a>

           
 <motion.a
   whileHover={{ scale: 1.2, color: "#d6b46d" }}
   className="p-2 bg-[#111827] rounded-full cursor-pointer text-gray-300"
  >
 <FaInstagram />
  </motion.a>

 <motion.a
   whileHover={{ scale: 1.2, color: "#d6b46d" }}
   className="p-2 bg-[#111827] rounded-full cursor-pointer text-gray-300"
 >
 <FaLinkedinIn />
 </motion.a>

  </div>
 </div>
 </div>

 <div className="border-t border-[#1f2937] text-center py-5 text-sm text-gray-500">
    © {new Date().getFullYear()} RentalHub. All rights reserved.
</div>

  </footer>
  
  );
};

export default Footer;