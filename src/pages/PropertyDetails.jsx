import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import BookingModal from "../components/BookingModal";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // FAVORITE
  const handleFavorite = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await api.post(
        "/favorites",
        {
          propertyId: property._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Added to favorites");
    } catch (error) {
      console.log(error);
      alert("Failed to add favorite");
    }
  };

  // PAYMENT
  const handlePayment = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await api.post(
        "/payment/create-payment-intent",
        {
          amount: property.price,
          bookingId: "temp-booking-id",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);
alert("Payment Intent Created Successfully");
    }catch (error) {
  console.log("Payment Error:", error.response?.data);
  alert(error.response?.data?.message || "Payment failed");
}
  };

  // REVIEW
  const handleReview = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await api.post(
        "/reviews",
        {
          propertyId: property._id,
          name: user?.name,
          email: user?.email,
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Review Added");

      const reviewRes = await api.get(`/reviews/${id}`);
      setReviews(reviewRes.data);

      setComment("");
      setRating(5);
    } catch (error) {
      console.log(error);
      alert("Failed to add review");
    }
  };

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await api.get(`/properties/${id}`);
        setProperty(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await api.get(`/reviews/${id}`);
        setReviews(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProperty();
    fetchReviews();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-20 text-white">
        Loading...
      </div>
    );
  }

  if (!property) {
    return (
      <div className="text-center mt-20 text-red-500">
        Not Found
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto min-h-0 bg-[#0b1220] text-white p-4 rounded-xl border border-[#d6b46d]/30 shadow-md">
      <h1 className="text-3xl font-bold text-[#d6b46d]">
        {property.title}
      </h1>

      <p className="text-gray-400 mt-2">
        {property.location}
      </p>

      <div className="mt-6 bg-[#111827] p-6 rounded-xl border border-[#d6b46d]">
        <p className="mb-2">
          <b>Type:</b> {property.propertyType}
        </p>

        <p className="mb-2">
          <b>Price:</b> ৳{property.price}
        </p>

        <p className="mb-2">
          <b>Bedrooms:</b> {property.bedrooms}
        </p>

        <p className="mb-2">
          <b>Bathrooms:</b> {property.bathrooms}
        </p>

        <p className="mt-4 text-gray-300">
          {property.description}
        </p>
      </div>

      <div className="mt-6 flex gap-3 flex-wrap">
        <button
          onClick={handleFavorite}
          className="bg-green-600 text-white px-6 py-3 rounded font-semibold hover:bg-green-700"
        >
          Add To Favorites
        </button>

        <button
          onClick={() => setShowModal(true)}
          className="bg-[#d6b46d] text-black px-6 py-3 rounded font-semibold hover:opacity-90"
        >
          Book Property
        </button>

        <button
          onClick={handlePayment}
          className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700"
        >
          Pay Now
        </button>
      </div>

      {showModal && (
        <BookingModal
          property={property}
          user={user}
          onClose={() => setShowModal(false)}
        />
      )}

      <div className="mt-10 bg-[#111827] p-6 rounded-xl border border-[#d6b46d]">
        <h2 className="text-2xl font-bold mb-4 text-[#d6b46d]">
          Write Review
        </h2>

        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full p-3 rounded text-black mb-3"
        >
          <option value={5}>5 Star</option>
          <option value={4}>4 Star</option>
          <option value={3}>3 Star</option>
          <option value={2}>2 Star</option>
          <option value={1}>1 Star</option>
        </select>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
          className="w-full p-3 rounded text-black"
        />

        <button
          onClick={handleReview}
          className="mt-4 bg-[#d6b46d] text-black px-6 py-2 rounded font-semibold"
        >
          Submit Review
        </button>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-5 text-[#d6b46d]">
          Reviews
        </h2>

        {reviews.length === 0 && (
          <p className="text-gray-400">
            No reviews yet
          </p>
        )}

        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-[#111827] p-5 rounded-xl mb-4 border border-gray-700"
          >
            <h3 className="font-bold">
              {review.name}
            </h3>

            <p className="text-sm text-gray-400">
              {review.email}
            </p>

            <p className="text-yellow-400">
              ⭐ {review.rating}/5
            </p>

            <p className="text-gray-300 mt-2">
              {review.comment}
            </p>

            <p className="text-xs text-gray-500 mt-2">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyDetails;