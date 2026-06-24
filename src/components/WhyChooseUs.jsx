const WhyChooseUs = () => {
  return (
    <div className="py-20 px-6 bg-[#0b0f14]">

      {/* TITLE */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#d6b46d]">
          Why Choose Us
        </h2>

        <p className="text-gray-400 mt-3">
          We provide the best rental experience for tenants and property owners
        </p>
      </div>

      {/* CARDS */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

        {/* CARD 1 */}
        <div className="bg-[#111827] border border-[#d6b46d] p-6 rounded-xl hover:scale-105 transition">
          <div className="text-4xl mb-4">🏡</div>
          <h3 className="text-xl font-bold text-white mb-2">
            Verified Properties
          </h3>
          <p className="text-gray-400">
            All listings are verified to ensure safe and trusted rental experience.
          </p>
        </div>

        {/* CARD 2 */}
        <div className="bg-[#111827] border border-[#d6b46d] p-6 rounded-xl hover:scale-105 transition">
          <div className="text-4xl mb-4">⚡</div>
          <h3 className="text-xl font-bold text-white mb-2">
            Fast Booking System
          </h3>
          <p className="text-gray-400">
            Easy and quick booking process with secure online payments.
          </p>
        </div>

        {/* CARD 3 */}
        <div className="bg-[#111827] border border-[#d6b46d] p-6 rounded-xl hover:scale-105 transition">
          <div className="text-4xl mb-4">🔒</div>
          <h3 className="text-xl font-bold text-white mb-2">
            Secure Platform
          </h3>
          <p className="text-gray-400">
            Your data and transactions are fully protected with secure authentication.
          </p>
        </div>

      </div>
    </div>
  );
};

export default WhyChooseUs;