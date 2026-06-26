import { useEffect, useState } from "react";
import api from "../api/axios";
import PropertyCard from "../components/PropertyCard";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);

  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("All");
  const [sort, setSort] = useState("");

  useEffect(() => {
  fetchProperties();
}, [location, propertyType, sort, page]);

  const fetchProperties = async () => {
    try {
      const res = await api.get("/properties", {
        params: {
          location,
          propertyType,
          sort,
        },
      });

      setProperties(res.data.properties);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-20 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f14] text-white p-6">

      <h1 className="text-3xl font-bold mb-8 text-center text-[#d6b46d]">
        All Properties
      </h1>

      
      <div className="grid md:grid-cols-3 gap-4 mb-8">

        <input
          type="text"
          placeholder="Search Location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="bg-[#111827] border border-[#d6b46d] p-3 rounded"
        />

        <select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className="bg-[#111827] border border-[#d6b46d] p-3 rounded"
        >
          <option value="All">All Types</option>
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Villa">Villa</option>
          <option value="Office">Office</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-[#111827] border border-[#d6b46d] p-3 rounded"
        >
          <option value="">Default</option>
          <option value="low">Price Low To High</option>
          <option value="high">Price High To Low</option>
        </select>

      </div>

      
      {properties.length > 0 ? (
          <>
        <div className="grid md:grid-cols-3 gap-6">

          {properties.map((item) => (
            <PropertyCard
              key={item._id}
              item={item}
            />
          ))}

        </div>
   
    <div className="flex justify-center gap-3 mt-10">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
      >
        Prev
      </button>

      <span className="text-white">
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
      >
        Next

      </button>

    </div>
  </>

  ) : (

 <p className="text-center text-gray-400 mt-10"> No Properties Found </p>

 )}
    </div>
  );
};

export default Properties;