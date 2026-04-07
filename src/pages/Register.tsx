import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "@/services/authService";
import { authStorage } from "@/lib/secureStorage";
import toast from "react-hot-toast";
import { Loader2, CheckCircle } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter your full name");
      return false;
    }

    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (!formData.phone.trim()) {
      toast.error("Please enter your phone number");
      return false;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    if (!agreedToTerms) {
      toast.error("Please agree to the Terms of Service and Privacy Policy");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
      });

      // Store tokens securely with AES encryption via secure-ls
      authStorage.setTokens(
        response.data.accessToken,
        response.data.refreshToken,
      );
      authStorage.setUser(response.data.user);

      toast.success(
        "Welcome to Heritage Boutique! Your account has been created successfully",
      );

      // Redirect to home or onboarding
      navigate("/");
    } catch (error: any) {
      toast.error(
        error.response?.data?.error?.message ||
          "Unable to create account. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialRegister = (provider: string) => {
    toast(`${provider} registration will be available soon`, {
      icon: "🔜",
    });
  };

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center relative overflow-hidden py-12 px-4 md:px-0">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-secondary-fixed opacity-20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary-fixed opacity-20 rounded-full blur-[120px]"></div>
        </div>

        {/* Registration Container */}
        <div className="relative z-10 w-full max-w-[1100px] flex flex-col md:flex-row bg-surface-container-lowest rounded-xl shadow-[0_20px_40px_rgba(24,28,27,0.06)] overflow-hidden">
          {/* Branding/Image Side */}
          <div className="hidden md:flex md:w-1/2 relative bg-primary-container items-center justify-center p-12 overflow-hidden">
            <img
              alt="Heritage Boutique Interior"
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBr0GfpFwbainXSaik5QFwPHee7UVgiWPlhFA0HLgG0uvDSdAe5vnz8T9OPC4F2h8Cpiz-OVTNDyZ1of7Umgo0yf1k3FXM7X62jnAa1llAPHMIIl5joTM3B6UQB_tjzv-YZffqwy9bwgXT2FqeELQUIJ6U5Y0NvpeQXERlF3WFJtwTgReHMUkPyvGJdfoHX2zmhANXuB85zTmhMIdeIz4Opc0l68rM9MUtbHZt8htWiceXFQbaLYAPhk1y9hwH4npodidIvjup5Dp5S"
            />
            <div className="relative z-10 text-on-primary-container">
              <h1 className="font-heading text-5xl font-extrabold tracking-tighter mb-6 leading-none">
                Heritage Boutique
              </h1>
              <p className="font-body text-xl opacity-90 max-w-sm leading-relaxed">
                Join an exclusive community dedicated to the finest curation of
                traditional elegance and modern luxury.
              </p>
              <div className="mt-12 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-primary-fixed" />
                  <span className="font-heading font-semibold">
                    Vetted Authenticity
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-primary-fixed" />
                  <span className="font-heading font-semibold">
                    Curated Collections
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col">
            <div className="mb-10 text-center md:text-left">
              <h2 className="font-heading text-3xl font-bold text-primary mb-2">
                Create Account
              </h2>
              <p className="text-on-surface-variant font-body">
                Begin your journey with the curated heritage.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block font-heading text-sm font-semibold text-primary mb-1.5 px-1">
                  Full Name
                </label>
                <input
                  className="w-full px-4 py-3.5 bg-surface-container-high rounded-lg border-none focus:ring-1 focus:ring-primary transition-all duration-300 font-body placeholder:text-outline-variant"
                  placeholder="Enter your full name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block font-heading text-sm font-semibold text-primary mb-1.5 px-1">
                  Email Address
                </label>
                <input
                  className="w-full px-4 py-3.5 bg-surface-container-high rounded-lg border-none focus:ring-1 focus:ring-primary transition-all duration-300 font-body placeholder:text-outline-variant"
                  placeholder="example@heritage.com"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block font-heading text-sm font-semibold text-primary mb-1.5 px-1">
                  Phone Number
                </label>
                <input
                  className="w-full px-4 py-3.5 bg-surface-container-high rounded-lg border-none focus:ring-1 focus:ring-primary transition-all duration-300 font-body placeholder:text-outline-variant"
                  placeholder="+880 1711-223344"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Password */}
                <div>
                  <label className="block font-heading text-sm font-semibold text-primary mb-1.5 px-1">
                    Password
                  </label>
                  <input
                    className="w-full px-4 py-3.5 bg-surface-container-high rounded-lg border-none focus:ring-1 focus:ring-primary transition-all duration-300 font-body placeholder:text-outline-variant"
                    placeholder="••••••••"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block font-heading text-sm font-semibold text-primary mb-1.5 px-1">
                    Confirm Password
                  </label>
                  <input
                    className="w-full px-4 py-3.5 bg-surface-container-high rounded-lg border-none focus:ring-1 focus:ring-primary transition-all duration-300 font-body placeholder:text-outline-variant"
                    placeholder="••••••••"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3 py-2">
                <input
                  className="mt-1 w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer"
                  id="terms"
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  disabled={isLoading}
                />
                <label
                  className="text-sm font-body text-on-surface-variant leading-tight cursor-pointer"
                  htmlFor="terms"
                >
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="text-primary font-semibold hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-primary font-semibold hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>

              {/* Submit */}
              <button
                className="w-full bg-gradient-to-r from-[#005344] to-[#006d5b] text-on-primary py-4 rounded-xl font-heading font-bold text-lg shadow-lg hover:opacity-95 transform active:scale-[0.98] transition-all duration-200 mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline-variant/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-surface-container-lowest text-outline italic font-body">
                  or register with
                </span>
              </div>
            </div>

            {/* Social Registration */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleSocialRegister("Google")}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-surface-container-high hover:bg-surface-variant transition-colors group"
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
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span className="font-heading text-sm font-semibold text-secondary">
                  Google
                </span>
              </button>
              <button
                onClick={() => handleSocialRegister("Facebook")}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-surface-container-high hover:bg-surface-variant transition-colors group"
                type="button"
              >
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="font-heading text-sm font-semibold text-secondary">
                  Facebook
                </span>
              </button>
            </div>

            <div className="mt-auto pt-10 text-center">
              <p className="font-body text-sm text-on-surface-variant">
                Already have an account?{" "}
                <Link
                  className="text-primary font-bold ml-1 hover:underline"
                  to="/login"
                >
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Shared Footer */}
      <footer className="w-full py-12 px-8 bg-[#f1f4f1] flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-6">
        <div className="font-heading font-bold text-primary text-xl">
          Heritage Boutique
        </div>
        <div className="flex flex-wrap justify-center gap-8 font-body text-sm tracking-wide">
          <Link
            className="text-secondary hover:text-primary transition-colors"
            to="/privacy"
          >
            Privacy Policy
          </Link>
          <Link
            className="text-secondary hover:text-primary transition-colors"
            to="/terms"
          >
            Terms of Service
          </Link>
          <Link
            className="text-secondary hover:text-primary transition-colors"
            to="/help"
          >
            Help Center
          </Link>
          <Link
            className="text-secondary hover:text-primary transition-colors"
            to="/contact"
          >
            Contact Us
          </Link>
        </div>
        <div className="font-body text-sm text-secondary opacity-80">
          © 2024 The Curated Heritage. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Register;
