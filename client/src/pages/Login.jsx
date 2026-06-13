import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../store/auth/authSlice";
import { Link } from "react-router";
import LoadingScreen from "../components/LoadingScreen";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isError, setIsError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(login(formData)).unwrap();
      navigate("/");
    } catch (error) {
      console.log("Login Failed", error);

      setIsError(error || "Something went wrong");

      setTimeout(() => {
        setIsError("");
      }, 5000);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-indigo-50 relative overflow-hidden flex items-center justify-center px-4 py-10">

      {/* BACKGROUND GLOW */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-indigo-200/40 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-200/40 blur-3xl rounded-full"></div>

      {/* CARD */}
      <div className="relative z-10 w-full max-w-md">

        <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-[2rem] shadow-[0_20px_60px_rgba(79,70,229,0.15)] p-8 md:p-10 hover:shadow-[0_30px_80px_rgba(79,70,229,0.20)] transition-all duration-500">

          {/* TITLE */}
          <div className="text-center mb-8">

            <div className="inline-block px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold tracking-wide mb-5">

              WELCOME BACK

            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold tracking-[-0.04em] text-[#0b132b] leading-tight">

              Login

            </h1>

            <p className="text-slate-500 mt-3 text-base md:text-lg font-medium">

              Access your auction account instantly

            </p>

          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* EMAIL */}
            <div>

              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-700 mb-2 tracking-wide"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-white/70 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 shadow-sm hover:shadow-md"
                placeholder="you@example.com"
                required
              />

            </div>

            {/* PASSWORD */}
            <div>

              <label
                htmlFor="password"
                className="block text-sm font-semibold text-slate-700 mb-2 tracking-wide"
              >
                Password
              </label>

              <div className="relative">

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                  className="w-full px-5 py-4 pr-14 rounded-2xl border border-slate-200 bg-white/70 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 shadow-sm hover:shadow-md"
                  placeholder="••••••••"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-indigo-600 transition-colors duration-300"
                >

                  {showPassword ? (
                    <FaEyeSlash className="text-lg" />
                  ) : (
                    <FaEye className="text-lg" />
                  )}

                </button>

              </div>

            </div>

            {/* ERROR */}
            {isError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-2xl text-sm font-medium animate-pulse">

                {isError}

              </div>
            )}

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-[0_20px_50px_rgba(79,70,229,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          {/* FORGOT PASSWORD */}
          <div className="mt-6 text-center">

            <Link
              to="/forgot-password"
              className="text-slate-500 hover:text-indigo-700 font-medium transition-colors duration-300 hover:underline"
            >
              Forgot your password?
            </Link>

          </div>

          {/* SIGNUP */}
          <div className="mt-8 text-center text-slate-600 font-medium">

            Don&apos;t have an account?{" "}

            <Link
              to="/signup"
              className="text-indigo-700 font-bold hover:text-cyan-600 transition-colors duration-300 hover:underline"
            >
              Sign up
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Login;