import { Shield, Globe, Bell, CheckCircle } from "lucide-react";

const Settings = () => {
  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Account Security */}
        <div className="bg-surface-container-lowest rounded-lg p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <h2 className="font-heading text-title-lg font-bold text-on-surface">
              Account Security
            </h2>
          </div>
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-2">
                Current Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-surface-container-high border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary text-sm text-on-surface"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-2">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full bg-surface-container-high border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary text-sm text-on-surface"
              />
            </div>
            <div className="pt-2">
              <button
                type="button"
                className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity w-full lg:w-auto"
              >
                Update Password
              </button>
            </div>
          </form>
          <div className="mt-6 pt-6 border-t border-surface-container">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-on-surface">
                  Two-Factor Authentication
                </p>
                <p className="text-xs text-on-surface-variant">
                  Add an extra layer of security
                </p>
              </div>
              <button className="text-primary font-bold text-sm hover:underline underline-offset-2">
                Enable
              </button>
            </div>
          </div>
        </div>

        {/* Language & Currency */}
        <div className="bg-surface-container-lowest rounded-lg p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center">
              <Globe className="w-5 h-5 text-primary" />
            </div>
            <h2 className="font-heading text-title-lg font-bold text-on-surface">
              Preferences
            </h2>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-3">
                Display Language
              </label>
              <div className="flex flex-wrap gap-2">
                <button className="px-4 py-2 rounded-full border-2 border-primary bg-primary text-primary-foreground text-xs font-bold transition-all">
                  English (US)
                </button>
                <button className="px-4 py-2 rounded-full border-2 border-outline-variant text-on-surface-variant text-xs font-medium hover:border-primary transition-all">
                  Bengali
                </button>
                <button className="px-4 py-2 rounded-full border-2 border-outline-variant text-on-surface-variant text-xs font-medium hover:border-primary transition-all">
                  French
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-3">
                Preferred Currency
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-lg bg-surface-container-high border-2 border-primary flex items-center justify-between">
                  <span className="text-sm font-bold text-on-surface">
                    BDT (৳)
                  </span>
                  <CheckCircle className="w-4 h-4 text-primary fill-primary" />
                </div>
                <button className="p-4 rounded-lg bg-surface-container-high border-2 border-transparent hover:border-outline-variant transition-all flex items-center justify-between">
                  <span className="text-sm font-medium text-on-surface">
                    USD ($)
                  </span>
                </button>
                <button className="p-4 rounded-lg bg-surface-container-high border-2 border-transparent hover:border-outline-variant transition-all flex items-center justify-between">
                  <span className="text-sm font-medium text-on-surface">
                    EUR (€)
                  </span>
                </button>
                <button className="p-4 rounded-lg bg-surface-container-high border-2 border-transparent hover:border-outline-variant transition-all flex items-center justify-between">
                  <span className="text-sm font-medium text-on-surface">
                    GBP (£)
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Notifications */}
      <div className="bg-surface-container-low rounded-lg p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center">
            <Bell className="w-5 h-5 text-primary" />
          </div>
          <h2 className="font-heading text-title-lg font-bold text-on-surface">
            Communication Preferences
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {/* Promotional Offers */}
          <div className="bg-surface-container-lowest p-5 rounded-lg border border-transparent hover:border-primary-fixed-dim transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-primary text-xl">🏷️</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-surface-container peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <h3 className="font-heading font-bold text-sm mb-1 text-on-surface">
              Promotional Offers
            </h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Receive updates about seasonal collections, private sales, and
              artisan collaborations.
            </p>
          </div>

          {/* Order Status */}
          <div className="bg-surface-container-lowest p-5 rounded-lg border border-transparent hover:border-primary-fixed-dim transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-primary text-xl">📦</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-surface-container peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <h3 className="font-heading font-bold text-sm mb-1 text-on-surface">
              Order Status
            </h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Real-time alerts for your orders, including dispatch details and
              delivery tracking.
            </p>
          </div>

          {/* Feedback & Reviews */}
          <div className="bg-surface-container-lowest p-5 rounded-lg border border-transparent hover:border-primary-fixed-dim transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-primary text-xl">⭐</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-surface-container peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <h3 className="font-heading font-bold text-sm mb-1 text-on-surface">
              Feedback & Reviews
            </h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Invitations to share your experience with purchased heritage
              pieces.
            </p>
          </div>
        </div>
      </div>

      {/* Dangerous Zone */}
      <div className="border-2 border-dashed border-error/20 rounded-lg p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="font-heading text-title-lg font-bold text-error mb-1">
            Deactivate Account
          </h2>
          <p className="text-sm text-on-surface-variant">
            Temporarily disable your profile and visibility. You can return at
            any time.
          </p>
        </div>
        <button className="px-6 py-3 border-2 border-error text-error font-bold rounded-lg text-sm hover:bg-error hover:text-white transition-all">
          Request Deactivation
        </button>
      </div>
    </div>
  );
};

export default Settings;
