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
    <div className="py-20 px-6 bg-[#0b0f14]">

      {/* TITLE */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#d6b46d]">
          Customer Reviews
        </h2>

        <p className="text-gray-400 mt-3">
          What our tenants say about us
        </p>
      </div>

      {/* REVIEW CARDS */}
      <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">

        {reviews.map((r, index) => (
          <div
            key={index}
            className="bg-[#111827] border border-[#d6b46d] p-5 rounded-xl hover:scale-105 transition"
          >
            <h3 className="text-white font-bold mb-1">{r.name}</h3>

            {/* STARS */}
            <p className="text-[#d6b46d] mb-2">
              {"★".repeat(r.rating)}
            </p>

            <p className="text-gray-400 text-sm">
              {r.comment}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Reviews;