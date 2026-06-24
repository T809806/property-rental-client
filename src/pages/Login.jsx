import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      // ✅ TOKEN save
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      // ✅ USER save (FIXED PART)
      if (res.data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );
      }

      setMessage("Login successful");

      // redirect after login
      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error) {
      console.log(error);
      setMessage(
        error.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <form
        onSubmit={handleLogin}
        className="w-[400px] bg-[#111827] p-8 rounded-xl border border-[#d6b46d]"
      >
        <h2 className="text-2xl font-bold text-center text-[#d6b46d] mb-6">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded bg-[#0f2f2f] outline-none text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded bg-[#0f2f2f] outline-none text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#d6b46d] text-black py-3 rounded font-semibold"
        >
          {loading ? "Logging in..." : "Login"}
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

export default Login;