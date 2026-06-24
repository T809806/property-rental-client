const Footer = () => {
  return (
    <footer className="bg-[#0b0f14] border-t border-[#1f2937] text-gray-300">

      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">

        {/* LOGO + DESCRIPTION */}
        <div>
          <h2 className="text-2xl font-bold text-[#d6b46d] mb-3">
            RentalHub
          </h2>
          <p className="text-sm text-gray-400">
            A trusted property rental platform where tenants and owners connect
            safely and easily. Find your perfect home today.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-[#d6b46d] cursor-pointer">Home</li>
            <li className="hover:text-[#d6b46d] cursor-pointer">All Properties</li>
            <li className="hover:text-[#d6b46d] cursor-pointer">Login</li>
            <li className="hover:text-[#d6b46d] cursor-pointer">Register</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Email: support@rentalhub.com</li>
            <li>Phone: +880 1234 567890</li>
            <li>Dhaka, Bangladesh</li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="text-white font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <span className="hover:text-[#d6b46d] cursor-pointer">📘</span>
            <span className="hover:text-[#d6b46d] cursor-pointer">🐦</span>
            <span className="hover:text-[#d6b46d] cursor-pointer">📸</span>
            <span className="hover:text-[#d6b46d] cursor-pointer">💼</span>
          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-[#1f2937] text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} RentalHub. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;