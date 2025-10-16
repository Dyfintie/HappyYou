"use client";
import { useState } from "react";
import {
  LogIn,
  UserPlus,
  Mail,
  Lock,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginSignupHeader() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [role, setRole] = useState("patient");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    console.log("Form submitted with:", e);
    if (isLogin) {
      try {
        const response = await fetch("http://localhost:4000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        console.log("Login attempt with:", { email, password });
        setMessage("Successfully logged in!");
        router.push("/");
      } catch (error) {
        console.log("error: ", error);
        setMessage("Laggaye log in mai!");
      }
      setIsLogin(true);
      setPassword("");
    } else {
      try {
        const response = await fetch(
          "http://localhost:4000/api/auth/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: "Paplu",
              email: email,
              password: password,
              role: role,
            }),
          }
        );
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        router.push("/");
        console.log("Signup attempt with:", { email, password, role });
        setMessage("Account created successfully! You can now log in.");
      } catch (error) {
        console.log("error: ", error);
        setMessage("Laggaye register in mai!");
      }
      setIsLogin(true);
      setPassword("");
    }
  };

  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <div className="min-h-screen bg-[#F3F6F9] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-[#FAFAFA] rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-br from-[#A7C7E7] to-[#BFE3C0] p-8 text-gray-800">
            <div className="flex items-center justify-center mb-4">
              {isLogin ? (
                <LogIn className="w-12 h-12" />
              ) : (
                <UserPlus className="w-12 h-12" />
              )}
            </div>
            <h2 className="text-3xl font-bold text-center">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-center text-gray-700 mt-2">
              {isLogin
                ? "Sign in to continue to your account"
                : "Sign up to get started"}
            </p>
          </div>

          <div className="p-8">
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            {message && (
              <div className="mb-4 p-4 bg-[#BFE3C0]/30 border border-[#BFE3C0] rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
                <p className="text-green-800 text-sm">{message}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A7C7E7] focus:border-transparent transition-all outline-none bg-white"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={passwordVisible ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A7C7E7] focus:border-transparent transition-all outline-none bg-white"
                    placeholder="••••••••"
                  />
                  <button
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
                    type="button"
                    onClick={togglePasswordVisibility}
                    aria-label={
                      passwordVisible ? "Hide password" : "Show password"
                    }
                  >
                    <div className="h-5 w-5">
                      <img
                        src={
                          passwordVisible
                            ? "hidePassEye.png"
                            : "showPassEye.png"
                        }
                        alt=""
                      />
                    </div>
                  </button>
                </div>
                {!isLogin && (
                  <p className="mt-2 text-xs text-gray-500">
                    Must be at least 6 characters
                  </p>
                )}
              </div>

              {!isLogin ? (
                <div className="flex flex-col items-start space-y-2">
                  <label
                    htmlFor="role-select"
                    className="text-sm font-medium text-gray-700"
                  >
                    Select Role
                  </label>

                  <select
                    id="role-select"
                    value={role}
                    onChange={handleRoleChange}
                    className="block w-40 py-2 px-2 text-gray-600 border border-gray-300 bg-white rounded-lg outline-none focus:ring-[#293d50] focus:border-[#dddddd] sm:text-sm transition-all"
                  >
                    <option value="Patient">Patient</option>
                    <option value="Doctor">Doctor</option>
                  </select>

                  <p className="text-gray-400 mt-4">
                    Selected Role:{" "}
                    <span className="font-semibold text-[#6bd865]">{role}</span>
                  </p>
                </div>
              ) : (
                <div></div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#A7C7E7] to-[#D8C7FF] text-gray-800 py-3 px-4 rounded-lg font-semibold hover:from-[#95B5D5] hover:to-[#C6B5ED] focus:outline-none focus:ring-2 focus:ring-[#D8C7FF] focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>
                      {isLogin ? "Signing in..." : "Creating account..."}
                    </span>
                  </>
                ) : (
                  <>
                    {isLogin ? (
                      <LogIn className="w-5 h-5" />
                    ) : (
                      <UserPlus className="w-5 h-5" />
                    )}
                    <span>{isLogin ? "Sign In" : "Sign Up"}</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#FAFAFA] text-gray-600">
                    {isLogin
                      ? "Don't have an account?"
                      : "Already have an account?"}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError(null);
                  setMessage(null);
                }}
                className="mt-4 w-full py-3 px-4 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:border-[#D8C7FF] hover:text-[#8B7BA8] focus:outline-none focus:ring-2 focus:ring-[#D8C7FF] focus:ring-offset-2 transition-all"
              >
                {isLogin ? "Create an account" : "Sign in instead"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
