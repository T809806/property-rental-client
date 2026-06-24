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
        className="space-y-4"
      >

        <input
          type="text"
          name="title"
          placeholder="Property Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <select
          name="propertyType"
          value={form.propertyType}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        >
          <option value="">
            Select Property Type
          </option>

          <option value="Apartment">
            Apartment
          </option>

          <option value="House">
            House
          </option>

          <option value="Office">
            Office
          </option>

          <option value="Villa">
            Villa
          </option>
        </select>

        <input
          type="number"
          name="price"
          placeholder="Rent Price"
          value={form.price}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <select
          name="rentType"
          value={form.rentType}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="Monthly">
            Monthly
          </option>

          <option value="Weekly">
            Weekly
          </option>

          <option value="Daily">
            Daily
          </option>
        </select>

        <input
          type="number"
          name="bedrooms"
          placeholder="Bedrooms"
          value={form.bedrooms}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="number"
          name="bathrooms"
          placeholder="Bathrooms"
          value={form.bathrooms}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="propertySize"
          placeholder="Property Size"
          value={form.propertySize}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="amenities"
          placeholder="Amenities (comma separated)"
          value={form.amenities}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="images"
          placeholder="Image URLs (comma separated)"
          value={form.images}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="extraFeatures"
          placeholder="Extra Features (comma separated)"
          value={form.extraFeatures}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-6 py-3 rounded"
        >
          {loading
            ? "Adding..."
            : "Add Property"}
        </button>

        {message && (
          <p className="mt-4">
            {message}
          </p>
        )}

      </form>

    </div>
  );
};

export default AddProperty;