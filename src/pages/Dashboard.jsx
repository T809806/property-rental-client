import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  console.log("USER =", user);
console.log("USER ID =", user?._id);

  const [favorites, setFavorites] = useState([]);
  const [bookings, setBookings] = useState([]);

  const fetchData = async () => {
    try {
      const favoriteRes = await api.get("/favorites", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

 setFavorites(favoriteRes.data);

      const bookingRes = await api.get(

  `/bookings/user/${user._id}`,

  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
 setBookings(bookingRes.data);

 } catch (error) {

 console.log(error);

    }

  };

  useEffect(() => {
    if (token && user) {
      fetchData();
    }
  }, [token]);

  const handleRemoveFavorite = async (id) => {
    try {
      await api.delete(`/favorites/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchData();

    } catch (error) {
      console.log(error);
    }
  };

  return (

 <div className="min-h-screen bg-[#0b0f14] text-white p-6">

   <h1 className="text-3xl font-bold text-[#d6b46d] mb-6"> Dashboard </h1>

 <div className="bg-[#111827] p-6 rounded-xl border border-[#d6b46d] mb-10">

 <h2 className="text-2xl font-semibold">
   Welcome, {user?.name}
 </h2>

 <p>Email: {user?.email}</p>
 <p>Role: {user?.role}</p>

 <Link
   to="/profile"
 className="inline-block mt-4 bg-[#d6b46d] text-black px-4 py-2 rounded"
  >
 View Profile

 </Link>

</div>

 <h2 className="text-2xl font-bold text-[#d6b46d] mb-4"> My Bookings  </h2>

 <table className="w-full border border-gray-700 mb-10">
   <thead>
  <tr className="bg-[#111827]">
    <th className="p-3 border">Property</th>
   <th className="p-3 border">Booking Date</th>
   <th className="p-3 border">Amount Paid</th>
   <th className="p-3 border">Booking Status</th>
   <th className="p-3 border">Payment Status</th>

  </tr>
 </thead>

        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td className="border p-3">
                {booking.propertyId?.title}
              </td>

              <td className="border p-3">
                {new Date(
                  booking.createdAt
                ).toLocaleDateString()}
              </td>

              <td className="border p-3">
                ৳{booking.amount || 0}
              </td>

              <td className="border p-3">
                {booking.status}
              </td>

              <td className="border p-3">
                {booking.paymentStatus}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    
      <h2 className="text-2xl font-bold text-[#d6b46d] mb-4">
        My Favorites
      </h2>

      <table className="w-full border border-gray-700">

        <thead>
          <tr className="bg-[#111827]">
            <th className="p-3 border">
              Property
            </th>

            <th className="p-3 border">
              Location
            </th>

            <th className="p-3 border">
              Rent
            </th>

            <th className="p-3 border">
              Action
            </th>
          </tr>
        </thead>

        <tbody>

          {favorites.map((fav) => (
            <tr key={fav._id}>

              <td className="border p-3">
                {fav.propertyId?.title}
              </td>

              <td className="border p-3">
                {fav.propertyId?.location}
              </td>

              <td className="border p-3">
                ৳{fav.propertyId?.price}
              </td>

              <td className="border p-3">

                <button
                  onClick={() =>
                    handleRemoveFavorite(
                      fav._id
                    )
                  }
                  className="bg-red-500 px-3 py-1 rounded"
                >
                  Remove
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default Dashboard;