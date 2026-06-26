import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    photo: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await api.post("/auth/register", {
        ...form,
        role: "Tenant", 
      });

      setMessage("Registration successful");

      setForm({
        name: "",
        email: "",
        photo: "",
        password: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {
      console.log(error);
      setMessage(
        error.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-[#0b0f14] text-white">

      <form
        onSubmit={handleRegister}
        className="w-[400px] bg-[#111827] p-8 rounded-xl border border-[#d6b46d]"
      >
  <h2 className="text-2xl font-bold text-center text-[#d6b46d] mb-6"> Register </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full p-3 mb-3 rounded bg-[#0f2f2f] outline-none"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 mb-3 rounded bg-[#0f2f2f] outline-none"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="photo"
          placeholder="Photo URL"
          className="w-full p-3 mb-3 rounded bg-[#0f2f2f] outline-none"
          value={form.photo}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded bg-[#0f2f2f] outline-none"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#d6b46d] text-black py-3 rounded font-semibold"
        >
          {loading ? "Creating..." : "Register"}
        </button>

        {message && (
          <p className="text-center mt-4 text-sm text-green-400">
            {message}
          </p>
        )}

      </form>
    </div>
  );
};

export default Register;