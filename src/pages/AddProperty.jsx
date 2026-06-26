import { useState } from "react";
import api from "../api/axios";

const AddProperty = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    propertyType: "",
    price: "",
    rentType: "Monthly",
    bedrooms: "",
    bathrooms: "",
    propertySize: "",
    amenities: "",
    images: "",
    extraFeatures: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token =
        localStorage.getItem("token");

      await api.post(
        "/properties",
        {
          title: form.title,
          description: form.description,
          location: form.location,
          propertyType:
            form.propertyType,
          price: Number(form.price),
          rentType: form.rentType,
          bedrooms: Number(
            form.bedrooms
          ),
          bathrooms: Number(
            form.bathrooms
          ),
          propertySize:
            form.propertySize,

          amenities:
            form.amenities
              .split(",")
              .map((item) =>
                item.trim()
              ),

          images:
            form.images
              .split(",")
              .map((item) =>
                item.trim()
              ),

          extraFeatures:
            form.extraFeatures
              .split(",")
              .map((item) =>
                item.trim()
              ),

          status: "Pending",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(
        "✅ Property Added Successfully"
      );

      setForm({
        title: "",
        description: "",
        location: "",
        propertyType: "",
        price: "",
        rentType: "Monthly",
        bedrooms: "",
        bathrooms: "",
        propertySize: "",
        amenities: "",
        images: "",
        extraFeatures: "",
      });
    } catch (error) {
      console.log(error);

      setMessage(
        "❌ Failed To Add Property"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Add Property
      </h1>

      <form
  onSubmit={handleSubmit}
  className="max-w-5xl mx-auto bg-[#111827] border border-[#2b3648] rounded-2xl shadow-2xl p-8 space-y-8"
>

  <div className="text-center">
    <h2 className="text-3xl font-bold text-[#d6b46d]">
      Add New Property
    </h2>

    <p className="text-gray-400 mt-2">
      Fill in the details to publish your property.
    </p>
  </div>

  <div className="grid md:grid-cols-2 gap-6">

    <div>
      <label className="block text-sm text-gray-300 mb-2">
        Property Title
      </label>

      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Luxury Apartment"
        className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#d6b46d] focus:outline-none"
        required
      />
    </div>

    <div>
      <label className="block text-sm text-gray-300 mb-2">
        Location
      </label>

      <input
        type="text"
        name="location"
        value={form.location}
        onChange={handleChange}
        placeholder="Dhaka"
        className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#d6b46d] focus:outline-none"
        required
      />
    </div>

    <div>
      <label className="block text-sm text-gray-300 mb-2">
        Property Type
      </label>

      <select
        name="propertyType"
        value={form.propertyType}
        onChange={handleChange}
        className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#d6b46d] focus:outline-none"
      >
        <option value="">Select</option>
        <option value="Apartment">Apartment</option>
        <option value="House">House</option>
        <option value="Villa">Villa</option>
        <option value="Office">Office</option>
      </select>
    </div>

    <div>
      <label className="block text-sm text-gray-300 mb-2">
        Rent Price
      </label>

      <input
        type="number"
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="25000"
        className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#d6b46d] focus:outline-none"
      />
    </div>

    <div>
      <label className="block text-sm text-gray-300 mb-2">
        Rent Type
      </label>

      <select
        name="rentType"
        value={form.rentType}
        onChange={handleChange}
        className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#d6b46d] focus:outline-none"
      >
        <option>Monthly</option>
        <option>Weekly</option>
        <option>Daily</option>
      </select>
    </div>

    <div>
      <label className="block text-sm text-gray-300 mb-2">
        Property Size
      </label>

      <input
        type="text"
        name="propertySize"
        value={form.propertySize}
        onChange={handleChange}
        placeholder="1800 sqft"
        className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#d6b46d] focus:outline-none"
      />
    </div>

    <div>
      <label className="block text-sm text-gray-300 mb-2">
        Bedrooms
      </label>

      <input
        type="number"
        name="bedrooms"
        value={form.bedrooms}
        onChange={handleChange}
        placeholder="3"
        className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#d6b46d] focus:outline-none"
      />
    </div>

    <div>
      <label className="block text-sm text-gray-300 mb-2">
        Bathrooms
      </label>

      <input
        type="number"
        name="bathrooms"
        value={form.bathrooms}
        onChange={handleChange}
        placeholder="2"
        className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#d6b46d] focus:outline-none"
      />
    </div>

  </div>

  <div>

    <label className="block text-sm text-gray-300 mb-2">
      Description
    </label>

    <textarea
      rows="5"
      name="description"
      value={form.description}
      onChange={handleChange}
      placeholder="Write detailed property description..."
      className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#d6b46d] focus:outline-none"
    />

  </div>

  <div className="grid md:grid-cols-3 gap-6">

    <div>

      <label className="block text-sm text-gray-300 mb-2">
        Amenities
      </label>

      <input
        type="text"
        name="amenities"
        value={form.amenities}
        onChange={handleChange}
        placeholder="Wifi, Lift, Parking"
        className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 text-white"
      />

    </div>

    <div>

      <label className="block text-sm text-gray-300 mb-2">
        Images
      </label>

      <input
        type="text"
        name="images"
        value={form.images}
        onChange={handleChange}
        placeholder="Image URL"
        className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 text-white"
      />

    </div>

    <div>

      <label className="block text-sm text-gray-300 mb-2">
        Extra Features
      </label>

      <input
        type="text"
        name="extraFeatures"
        value={form.extraFeatures}
        onChange={handleChange}
        placeholder="Balcony, Garden"
        className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-3 text-white"
      />

    </div>

  </div>

  <button
    type="submit"
    disabled={loading}
    className="w-full py-4 rounded-xl bg-[#d6b46d] text-black font-bold text-lg hover:scale-[1.02] transition duration-300"
  >
    {loading ? "Adding Property..." : "Add Property"}
  </button>

  {message && (
    <div className="text-center text-green-400 font-semibold">
      {message}
    </div>
  )}

</form>

    </div>
  );
};

export default AddProperty;