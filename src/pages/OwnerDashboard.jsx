import { useEffect, useState } from "react";
import api from "../api/axios";
import Loading from "./Loading";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const OwnerDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [analytics, setAnalytics] = useState({
    totalEarnings: 0,
    totalProperties: 0,
    totalBookings: 0,
  });

  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [earningsData, setEarningsData] =
    useState([]);

    const [loading, setLoading] =
  useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // OWNER PROPERTIES
        const propertyRes = await api.get(
          "/properties",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const ownerProperties =
          propertyRes.data.filter(
            (p) => p.owner === user._id
          );

        setProperties(ownerProperties);

        // OWNER BOOKINGS
        const bookingRes = await api.get(
          "/bookings/owner/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBookings(bookingRes.data);

        // MONTHLY EARNINGS
        const earningsRes = await api.get(
          "/owner/monthly-earnings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setEarningsData(
          earningsRes.data
        );

        // ANALYTICS
        const totalProperties =
          ownerProperties.length;

        const totalBookings =
          bookingRes.data.length;

        const totalEarnings =
          bookingRes.data.reduce(
            (sum, booking) =>
              sum + (booking.amount || 0),
            0
          );

        setAnalytics({
          totalEarnings,
          totalProperties,
          totalBookings,
        });

      } catch (error) {
  console.log(error);
} finally {
  setLoading(false);
}
    };

    if (token && user) {
      fetchData();
    }
  }, [token, user]);

if (loading) {
  return <Loading />;
}

return (
    <div className="p-6">

      <h1 className="text-3xl font-bold text-[#d6b46d] mb-6">
        Owner Dashboard
      </h1>

      {/* SUMMARY CARDS */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-[#111827] p-5 rounded-xl border border-[#d6b46d]">
          <h3 className="text-gray-400">
            Total Earnings
          </h3>

          <p className="text-2xl text-[#d6b46d]">
            ৳ {analytics.totalEarnings}
          </p>
        </div>

        <div className="bg-[#111827] p-5 rounded-xl border border-[#d6b46d]">
          <h3 className="text-gray-400">
            Total Properties
          </h3>

          <p className="text-2xl text-[#d6b46d]">
            {analytics.totalProperties}
          </p>
        </div>

        <div className="bg-[#111827] p-5 rounded-xl border border-[#d6b46d]">
          <h3 className="text-gray-400">
            Total Bookings
          </h3>

          <p className="text-2xl text-[#d6b46d]">
            {analytics.totalBookings}
          </p>
        </div>

      </div>

      {/* MONTHLY EARNINGS CHART */}
      <h2 className="text-2xl font-bold text-[#d6b46d] mb-4">
        Monthly Earnings
      </h2>

      <div className="bg-[#111827] p-6 rounded-xl mb-10">

        <ResponsiveContainer
          width="100%"
          height={350}
        >

          <LineChart
            data={earningsData}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="month"
            />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="earnings"
              stroke="#d6b46d"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

      {/* MY PROPERTIES */}
      <h2 className="text-2xl font-bold text-[#d6b46d] mb-4">
        My Properties
      </h2>

      <div className="grid md:grid-cols-3 gap-6 mb-10">

        {properties.map((p) => (
          <div
            key={p._id}
            className="bg-[#111827] p-4 rounded-xl border border-gray-700"
          >
            <h3 className="text-xl font-bold">
              {p.title}
            </h3>

            <p className="text-gray-400">
              {p.location}
            </p>

            <p className="text-[#d6b46d] mt-2">
              ৳ {p.price}
            </p>

            <p className="text-sm mt-2">
              Status: {p.status}
            </p>

            <div className="flex gap-2 mt-4">

  <button
    className="bg-blue-600 px-3 py-1 rounded"
  >
    Update
  </button>

  <button
    className="bg-red-600 px-3 py-1 rounded"
  >
    Delete
  </button>

</div>

          </div>
        ))}

      </div>

      {/* BOOKING REQUESTS */}
      <h2 className="text-2xl font-bold text-[#d6b46d] mb-4">
        Booking Requests
      </h2>

      <div className="space-y-4">

        {bookings.map((b) => (
          <div
            key={b._id}
            className="bg-[#111827] p-4 rounded-xl border border-gray-700"
          >
            <h3 className="text-xl font-bold">
              {b.propertyId?.title}
            </h3>

            <p className="text-gray-400">
              Tenant: {b.userId?.name}
            </p>

            <p>
              Move-in: {b.moveInDate}
            </p>

            <p>
              Contact: {b.contactNumber}
            </p>

            <div className="flex gap-4 mt-2">

              <span className="text-yellow-400">
                {b.status}
              </span>

              <span className="text-green-400">
                {b.paymentStatus}
              </span>

            </div>

            <div className="flex gap-2 mt-3">

  <button
    className="bg-green-600 px-3 py-1 rounded"
  >
    Approve
  </button>

  <button
    className="bg-red-600 px-3 py-1 rounded"
  >
    Reject
  </button>

</div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default OwnerDashboard;