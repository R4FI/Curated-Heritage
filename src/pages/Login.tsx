/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "@/services/authService";
import { authStorage } from "@/lib/secureStorage";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.login({ email, password });

      // Store tokens securely with AES encryption via secure-ls
      authStorage.setTokens(
        response.data.accessToken,
        response.data.refreshToken,
      );
      authStorage.setUser(response.data.user);

      toast.success(`Welcome back, ${response.data.user.name}!`);

      // Redirect to home or previous page
      navigate("/");
    } catch (error: any) {
      console.log(error);
      toast.error(
        error.response?.data?.error?.message ||
          "Invalid credentials. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast(`${provider} login will be available soon`, {
      icon: "🔜",
    });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] rounded-xl overflow-hidden bg-white">
        {/* Left Side: Editorial Lifestyle Section */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-[#005344] relative text-white">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD-gHKVK8h1mlUCPohtLjUrS-e3EGUDIfMd1DrqkcvjRrkDGDttNi09jJ9mUStPUzqrhkavOpCY94PaSVGY61ACVynBDEWMMWN0uD4KsSMU9NNL_FfsZb__9O6UHZ7o-Y6vDGNgVkZykUo23zgcWfXR818gIHqLyhFIuWZOk0Lw0kHsCmbe71fOSt8DI5E_1N8WKG5gP4r6M2Hq6Eixk0P40b9cMMdkHQ7_iWCpXTJp6OpHtSzp_j8EdI54mXeEInQL848-ft2jH1Ow')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="relative z-20">
            <h1 className="font-bold text-4xl tracking-tighter">
              Heritage Boutique
            </h1>
            <p className="mt-4 text-teal-100 max-w-xs leading-relaxed">
              Curating timeless elegance and artisanal craftsmanship for the
              modern discerning lifestyle.
            </p>
          </div>
          <div className="relative z-20">
            <blockquote className="italic text-xl leading-snug">
              "Tradition is not the worship of ashes, but the preservation of
              fire."
            </blockquote>
            <p className="mt-2 text-sm font-semibold text-teal-100">
              — The Curated Heritage
            </p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-8 md:p-16 flex flex-col justify-center bg-white">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-bold text-[#005344] mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600">
              Please enter your details to access your curation.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                className="block text-sm font-semibold text-gray-900 mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                className="w-full px-4 py-3 bg-gray-100 border-none rounded-md focus:ring-1 focus:ring-[#005344] text-gray-900 placeholder:text-gray-400 transition-all outline-none"
                id="email"
                type="email"
                placeholder="name@heritage.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label
                  className="block text-sm font-semibold text-gray-900"
                  htmlFor="password"
                >
                  Password
                </label>
                <Link
                  className="text-xs font-semibold text-[#005344] hover:underline transition-all"
                  to="/forgot-password"
                >
                  Forgot Password?
                </Link>
              </div>
              <input
                className="w-full px-4 py-3 bg-gray-100 border-none rounded-md focus:ring-1 focus:ring-[#005344] text-gray-900 placeholder:text-gray-400 transition-all outline-none"
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <button
              className="w-full py-4 bg-gradient-to-r from-[#005344] to-[#006d5b] text-white font-bold rounded-md shadow-lg hover:opacity-90 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs font-semibold uppercase tracking-widest bg-white px-4 text-gray-500">
              Or continue with
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleSocialLogin("Google")}
              className="flex items-center justify-center gap-3 py-3 px-4 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-all text-sm font-medium text-gray-900 shadow-sm"
              type="button"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>
            <button
              onClick={() => handleSocialLogin("Facebook")}
              className="flex items-center justify-center gap-3 py-3 px-4 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-all text-sm font-medium text-gray-900 shadow-sm"
              type="button"
            >
              <svg
                className="w-5 h-5 text-[#1877F2] fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </button>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account yet?{" "}
              <Link
                className="font-bold text-[#005344] ml-1 hover:underline"
                to="/register"
              >
                Register Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
