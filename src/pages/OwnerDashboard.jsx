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
  const [selected, setSelected] = useState(null);
  const [earningsData, setEarningsData] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const propertyRes = await api.get("/properties", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

   const ownerProperties = propertyRes.data.properties.filter(
  (p) => p.owner?._id === user._id || p.owner === user._id

 );

 setProperties(ownerProperties);

       
 const bookingRes = await api.get("/bookings/owner/all", {
     headers: {
   Authorization: `Bearer ${token}`,
    },
 });

        setBookings(bookingRes.data);

      
        const earningsRes = await api.get("/owner/monthly-earnings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

 setEarningsData(earningsRes.data);

   const totalProperties =
      ownerProperties.length;

  const totalBookings = bookingRes.data.length;

 const totalEarnings = bookingRes.data.reduce(
  (sum, booking) => sum + (booking.amount || 0),
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

    <div className="text-white p-6">
    <h1 className="text-3xl font-bold text-[#d6b46d] mb-6">  Owner Dashboard </h1>

     
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-[#111827] p-5 rounded-xl border border-[#d6b46d]">
          <h3>Total Earnings</h3>
          <p className="text-2xl text-[#d6b46d]">
            ৳ {analytics.totalEarnings}
          </p>
        </div>

        <div className="bg-[#111827] p-5 rounded-xl border border-[#d6b46d]">
          <h3>Total Properties</h3>
          <p className="text-2xl text-[#d6b46d]">
            {analytics.totalProperties}
          </p>
        </div>

        <div className="bg-[#111827] p-5 rounded-xl border border-[#d6b46d]">
          <h3>Total Bookings</h3>
          <p className="text-2xl text-[#d6b46d]">
            {analytics.totalBookings}
          </p>
        </div>

      </div>

     
      <h2 className="text-2xl font-bold text-[#d6b46d] mb-4">
        My Properties
      </h2>

      <div className="grid md:grid-cols-3 gap-6 mb-10">

        {properties.map((p) => (
          <div key={p._id} className="bg-[#111827] p-4 rounded-xl">

            <h3 className="text-xl font-bold">{p.title}</h3>
            <p>{p.location}</p>
            <p className="text-[#d6b46d]">৳ {p.price}</p>
            <p>Status: {p.status}</p>

          </div>
        ))}

      </div>

      
      <h2 className="text-2xl font-bold text-[#d6b46d] mb-4">
        Booking Requests
      </h2>

      <div className="space-y-4">

        {bookings.map((b) => (
          <div key={b._id} className="bg-[#111827] p-4 rounded-xl">

            <h3 className="font-bold">
              {b.propertyId?.title}
            </h3>

            <p>Tenant: {b.userId?.name}</p>
            <p>Move-in: {b.moveInDate}</p>
            <p>Contact: {b.contactNumber}</p>

            <p>Status: {b.status}</p>

            <div className="flex gap-3 mt-3">

              <button className="bg-green-600 px-3 py-1 rounded">
                Approve
              </button>

              <button className="bg-red-600 px-3 py-1 rounded">
                Reject
              </button>

              <button
                onClick={() => setSelected(b)}
                className="text-blue-400 underline"
              >
                👁️ View
              </button>

            </div>

          </div>
        ))}

      </div>

      
   {selected && (
     <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">

     <div className="bg-white p-6 rounded w-96">

   <h2 className="text-xl font-bold mb-4 text-black"> Rejection Details </h2>

   <p className="text-black">
      {selected.rejectionReason || "No reason provided"}
       </p>
  <button
     onClick={() => setSelected(null)}
       className="mt-4 bg-red-500 text-white px-4 py-2"
    >
       Close
 </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default OwnerDashboard;