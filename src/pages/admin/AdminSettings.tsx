import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  Store,
  CreditCard,
  Truck,
  User,
  CheckCircle,
  Info,
  Sparkles,
  Eye,
  PlusCircle,
  Save,
  Shield,
  Copy,
  ChevronDown,
  Clock,
  DollarSign,
  GripVertical,
  MapPin,
  Globe,
  Rocket,
  Package,
  Heart,
  AlertTriangle,
  BarChart3,
  Edit,
} from "lucide-react";

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", label: "General", icon: Store },
    { id: "payment", label: "Payment", icon: CreditCard },
    { id: "shipping", label: "Shipping", icon: Truck },
    { id: "account", label: "Account", icon: User },
  ];

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold font-heading tracking-tight text-primary">
              Store Settings
            </h1>
            <p className="text-on-surface-variant mt-1">
              Manage your boutique's operational preferences and security.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-5 py-2.5 rounded-xl text-sm font-semibold text-primary border border-primary/20 hover:bg-primary/5 transition-all">
              Discard Changes
            </button>
            <button className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-primary to-primary-container text-white shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
              Save Changes
            </button>
          </div>
        </div>

        {/* Settings Tabs */}
        <div className="flex items-center space-x-8 border-b border-surface-container-highest mb-10 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative pb-4 text-sm font-semibold transition-colors ${
                  activeTab === tab.id
                    ? "text-primary font-bold"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Form Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {activeTab === "general" && (
              <>
                {/* Store Identity */}
                <section>
                  <h2 className="text-lg font-bold font-heading mb-6 text-on-surface flex items-center gap-2">
                    <span className="w-1 h-6 bg-primary rounded-full"></span>
                    Store Identity
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-surface-container-lowest rounded-xl shadow-sm">
                    <div className="space-y-2 col-span-2 md:col-span-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                        Store Name
                      </label>
                      <input
                        className="w-full bg-surface-container-high border-none rounded-lg p-3 text-sm focus:ring-1 focus:ring-primary transition-all"
                        type="text"
                        defaultValue="Heritage Admin"
                      />
                    </div>
                    <div className="space-y-2 col-span-2 md:col-span-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                        Contact Email
                      </label>
                      <input
                        className="w-full bg-surface-container-high border-none rounded-lg p-3 text-sm focus:ring-1 focus:ring-primary transition-all"
                        type="email"
                        defaultValue="curator@heritagestore.com"
                      />
                    </div>
                    <div className="space-y-2 col-span-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                        Store Description (Editorial View)
                      </label>
                      <textarea
                        className="w-full bg-surface-container-high border-none rounded-lg p-3 text-sm focus:ring-1 focus:ring-primary transition-all"
                        rows={3}
                        defaultValue="A curated collection of heritage-inspired crafts and premium lifestyle essentials for the modern home."
                      />
                    </div>
                  </div>
                </section>

                {/* Shipping Rates */}
                <section>
                  <h2 className="text-lg font-bold font-heading mb-6 text-on-surface flex items-center gap-2">
                    <span className="w-1 h-6 bg-primary rounded-full"></span>
                    Shipping Rates
                  </h2>
                  <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
                    <div className="grid grid-cols-3 bg-surface-container-low px-8 py-4 border-b border-surface-container">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                        Region
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                        Delivery Time
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant text-right">
                        Flat Rate (BDT)
                      </span>
                    </div>
                    <div className="divide-y divide-surface-container-low">
                      <div className="grid grid-cols-3 items-center px-8 py-5 hover:bg-surface/30 transition-colors">
                        <span className="text-sm font-semibold">
                          Inside Dhaka
                        </span>
                        <span className="text-xs text-on-surface-variant">
                          1-2 Business Days
                        </span>
                        <div className="flex justify-end">
                          <input
                            className="w-24 bg-surface-container-high border-none rounded-lg px-3 py-1.5 text-sm text-right focus:ring-1 focus:ring-primary"
                            type="number"
                            defaultValue="60"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 items-center px-8 py-5 hover:bg-surface/30 transition-colors">
                        <span className="text-sm font-semibold">
                          Outside Dhaka
                        </span>
                        <span className="text-xs text-on-surface-variant">
                          3-5 Business Days
                        </span>
                        <div className="flex justify-end">
                          <input
                            className="w-24 bg-surface-container-high border-none rounded-lg px-3 py-1.5 text-sm text-right focus:ring-1 focus:ring-primary"
                            type="number"
                            defaultValue="120"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="p-6 bg-surface-container-low/50 border-t border-surface-container">
                      <button className="text-xs font-bold text-primary flex items-center gap-2 hover:translate-x-1 transition-transform">
                        <PlusCircle className="w-4 h-4" />
                        ADD CUSTOM SHIPPING ZONE
                      </button>
                    </div>
                  </div>
                </section>

                {/* Payment Gateway */}
                <section>
                  <h2 className="text-lg font-bold font-heading mb-6 text-on-surface flex items-center gap-2">
                    <span className="w-1 h-6 bg-primary rounded-full"></span>
                    Payment Gateway
                  </h2>
                  <div className="p-8 bg-surface-container-lowest rounded-xl shadow-sm space-y-6">
                    <div className="flex items-center justify-between p-4 bg-secondary-container/20 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                          <CreditCard className="w-7 h-7 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-bold">Stripe Connect</p>
                          <p className="text-[11px] text-on-surface-variant">
                            Enabled for Global & Local Cards
                          </p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-primary-container/10 text-primary text-[10px] font-bold rounded-full">
                        CONNECTED
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                          Stripe Public Key
                        </label>
                        <div className="relative">
                          <input
                            className="w-full bg-surface-container-high border-none rounded-lg p-3 text-sm focus:ring-1 focus:ring-primary transition-all"
                            type="password"
                            defaultValue="pk_test_51Mz..."
                          />
                          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                          Default Currency
                        </label>
                        <select className="w-full bg-surface-container-high border-none rounded-lg p-3 text-sm focus:ring-1 focus:ring-primary transition-all">
                          <option>BDT (৳)</option>
                          <option>USD ($)</option>
                          <option>EUR (€)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            )}

            {activeTab === "payment" && (
              <>
                {/* Stripe Gateway Card */}
                <section className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-indigo-50 rounded-lg">
                        <CreditCard className="w-8 h-8 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-teal-950 font-heading">
                          Stripe Gateway
                        </h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          <span className="text-xs font-semibold text-green-700 uppercase">
                            Connected
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="text-sm font-semibold text-primary px-4 py-2 bg-primary-fixed rounded-lg">
                      Configure
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2 block">
                        Live Public Key
                      </label>
                      <div className="flex gap-2">
                        <input
                          className="bg-surface-container-high border-none rounded-lg px-4 py-2.5 text-sm w-full font-mono text-on-surface"
                          readOnly
                          type="text"
                          defaultValue="pk_live_51Msz...G92k"
                        />
                        <button className="p-2.5 bg-surface-container-high rounded-lg text-outline">
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2 block">
                        Live Secret Key
                      </label>
                      <div className="flex gap-2">
                        <input
                          className="bg-surface-container-high border-none rounded-lg px-4 py-2.5 text-sm w-full font-mono text-on-surface"
                          readOnly
                          type="password"
                          defaultValue="sk_live_v8h2j3k4l5m6n7o8p9q0"
                        />
                        <button className="p-2.5 bg-surface-container-high rounded-lg text-outline">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Regional & Payout Config */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Currency Selection */}
                  <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/10">
                    <h3 className="font-bold text-teal-950 mb-4 flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-primary" />
                      Primary Currency
                    </h3>
                    <div className="relative">
                      <select className="w-full bg-surface-container-high border-none rounded-lg px-4 py-3 text-sm appearance-none focus:ring-1 focus:ring-primary">
                        <option>BDT - Bangladeshi Taka</option>
                        <option>USD - United States Dollar</option>
                        <option>EUR - Euro</option>
                      </select>
                      <ChevronDown className="w-5 h-5 absolute right-3 top-3.5 text-outline pointer-events-none" />
                    </div>
                    <p className="mt-3 text-xs text-on-surface-variant">
                      Used for all internal balance calculations and reporting.
                    </p>
                  </div>

                  {/* Payout Schedule */}
                  <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/10">
                    <h3 className="font-bold text-teal-950 mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      Payout Schedule
                    </h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 p-3 rounded-lg border border-primary/20 bg-primary/5 cursor-pointer">
                        <input
                          defaultChecked
                          className="text-primary focus:ring-primary"
                          name="payout"
                          type="radio"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold">Daily</span>
                          <span className="text-[10px] text-primary/70">
                            Automatic daily transfers
                          </span>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 p-3 rounded-lg border border-transparent hover:bg-surface-container-high cursor-pointer transition-colors">
                        <input
                          className="text-primary focus:ring-primary"
                          name="payout"
                          type="radio"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold">Weekly</span>
                          <span className="text-[10px] text-on-surface-variant">
                            Every Monday at 08:00
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Payment Methods Section */}
                <section className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/10">
                  <h3 className="text-lg font-bold text-teal-950 font-heading mb-6">
                    Supported Payment Methods
                  </h3>
                  <div className="space-y-3">
                    {/* SSLCommerz */}
                    <div className="flex items-center justify-between p-4 bg-surface rounded-xl border border-outline-variant/10">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm text-xs font-bold text-primary">
                          SSL
                        </div>
                        <div>
                          <p className="font-semibold text-sm">
                            SSLCommerz (Aggregator)
                          </p>
                          <p className="text-xs text-on-surface-variant">
                            Supports all major banks & cards in BD
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-bold px-2 py-1 bg-green-100 text-green-700 rounded uppercase">
                          Active
                        </span>
                        <GripVertical className="w-5 h-5 text-outline cursor-pointer" />
                      </div>
                    </div>

                    {/* bKash */}
                    <div className="flex items-center justify-between p-4 bg-surface rounded-xl border border-outline-variant/10">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#E2136E] rounded-lg flex items-center justify-center shadow-sm">
                          <span className="text-white font-bold text-[10px]">
                            bKash
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-sm">bKash (MFS)</p>
                          <p className="text-xs text-on-surface-variant">
                            Direct checkout integration
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-bold px-2 py-1 bg-green-100 text-green-700 rounded uppercase">
                          Active
                        </span>
                        <GripVertical className="w-5 h-5 text-outline cursor-pointer" />
                      </div>
                    </div>

                    {/* Card Payments */}
                    <div className="flex items-center justify-between p-4 bg-surface rounded-xl border border-outline-variant/10 opacity-70">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center shadow-sm">
                          <CreditCard className="w-5 h-5 text-slate-500" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">
                            Global Credit Cards
                          </p>
                          <p className="text-xs text-on-surface-variant">
                            Visa, Mastercard, Amex
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-bold px-2 py-1 bg-slate-200 text-slate-600 rounded uppercase">
                          Inactive
                        </span>
                        <GripVertical className="w-5 h-5 text-outline cursor-pointer" />
                      </div>
                    </div>
                  </div>
                  <button className="mt-6 w-full py-3 border-2 border-dashed border-outline-variant rounded-xl text-outline text-sm font-semibold hover:bg-surface-container-high transition-colors">
                    + Add New Payment Method
                  </button>
                </section>
              </>
            )}

            {activeTab === "shipping" && (
              <>
                {/* Shipping Zones */}
                <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold font-headline text-teal-900">
                      Shipping Zones
                    </h3>
                    <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
                      <PlusCircle className="w-4 h-4" /> Add Zone
                    </button>
                  </div>
                  <div className="space-y-4">
                    {/* Zone: Inside Dhaka */}
                    <div className="bg-surface-container-low p-5 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-secondary-container rounded-lg text-primary">
                          <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-teal-950">
                            Inside Dhaka
                          </h4>
                          <p className="text-xs text-on-surface-variant">
                            Metropolitan area and immediate suburbs
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="text-right">
                          <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                            Standard Fee
                          </label>
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-semibold">৳</span>
                            <input
                              className="w-16 bg-transparent border-b border-outline-variant focus:border-primary focus:ring-0 text-sm font-bold text-primary py-0"
                              type="number"
                              defaultValue="60"
                            />
                          </div>
                        </div>
                        <div className="text-right">
                          <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                            Delivery Time
                          </label>
                          <input
                            className="w-24 bg-transparent border-b border-outline-variant focus:border-primary focus:ring-0 text-sm font-medium py-0"
                            type="text"
                            defaultValue="24-48 Hours"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Zone: Outside Dhaka */}
                    <div className="bg-surface-container-low p-5 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-secondary-container rounded-lg text-primary">
                          <Globe className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-teal-950">
                            Outside Dhaka
                          </h4>
                          <p className="text-xs text-on-surface-variant">
                            All other districts and rural areas
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="text-right">
                          <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                            Standard Fee
                          </label>
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-semibold">৳</span>
                            <input
                              className="w-16 bg-transparent border-b border-outline-variant focus:border-primary focus:ring-0 text-sm font-bold text-primary py-0"
                              type="number"
                              defaultValue="120"
                            />
                          </div>
                        </div>
                        <div className="text-right">
                          <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                            Delivery Time
                          </label>
                          <input
                            className="w-24 bg-transparent border-b border-outline-variant focus:border-primary focus:ring-0 text-sm font-medium py-0"
                            type="text"
                            defaultValue="3-5 Days"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Courier Integrations */}
                <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10">
                  <h3 className="text-xl font-bold font-headline text-teal-900 mb-6">
                    Courier Partners
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Pathao */}
                    <div className="border border-outline-variant/20 rounded-xl p-4 flex flex-col items-center text-center hover:bg-slate-50 transition-colors group">
                      <div className="h-12 w-12 bg-slate-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-primary/10">
                        <Rocket className="w-6 h-6 text-primary" />
                      </div>
                      <h5 className="font-bold text-sm">Pathao</h5>
                      <p className="text-[10px] text-slate-500 mb-4">
                        Fast urban delivery
                      </p>
                      <div className="mt-auto w-full">
                        <button className="w-full text-[11px] font-bold py-2 bg-secondary-container text-on-secondary-container rounded-lg">
                          CONNECTED
                        </button>
                      </div>
                    </div>

                    {/* RedX */}
                    <div className="border border-outline-variant/20 rounded-xl p-4 flex flex-col items-center text-center hover:bg-slate-50 transition-colors group">
                      <div className="h-12 w-12 bg-slate-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-primary/10">
                        <Package className="w-6 h-6 text-primary" />
                      </div>
                      <h5 className="font-bold text-sm">RedX</h5>
                      <p className="text-[10px] text-slate-500 mb-4">
                        Island-wide logistics
                      </p>
                      <div className="mt-auto w-full">
                        <button className="w-full text-[11px] font-bold py-2 bg-primary text-on-primary rounded-lg">
                          CONNECT
                        </button>
                      </div>
                    </div>

                    {/* Steadfast */}
                    <div className="border border-outline-variant/20 rounded-xl p-4 flex flex-col items-center text-center hover:bg-slate-50 transition-colors group">
                      <div className="h-12 w-12 bg-slate-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-primary/10">
                        <Heart className="w-6 h-6 text-primary" />
                      </div>
                      <h5 className="font-bold text-sm">Steadfast</h5>
                      <p className="text-[10px] text-slate-500 mb-4">
                        Reliable COD service
                      </p>
                      <div className="mt-auto w-full">
                        <button className="w-full text-[11px] font-bold py-2 bg-secondary-container text-on-secondary-container rounded-lg">
                          CONNECTED
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            )}

            {activeTab === "account" && (
              <>
                {/* Profile Card */}
                <section className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/15">
                  <div className="flex items-start gap-8">
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg">
                        <img
                          className="w-full h-full object-cover"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuADHKxsilILOkSnszSHw7v60xV_hVEZoolF5aQmLbgxNev76qXjrwetBhFs2QLcoDUrDuTo6_0m5ARcW-jV3MC528FIV5MljxcsYRrAhFqXF3RBJx7f2Rbg0vhNP4zQ_Y3gxRue3p8eoKIGA0q8MMVOlhHrsnfttoN6vk4GrUKsjbQIoWFfGlZ2bkJwn_qOmsVL0c8ck4SL5uFlueeTJVz6fQXtxcitR9epQ7-jy2NSwOZWMB1Mk_YA7aZqr_74vG6eWrp02ElCNeYP"
                          alt="Admin"
                        />
                      </div>
                      <button className="absolute -bottom-2 -right-2 bg-primary text-on-primary p-1.5 rounded-lg shadow-md border border-white/20">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-4">
                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-xs font-semibold text-secondary-container mb-1.5 px-1">
                          Full Name
                        </label>
                        <input
                          className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary"
                          type="text"
                          defaultValue="Alexander Veridian"
                        />
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-xs font-semibold text-secondary-container mb-1.5 px-1">
                          Email Address
                        </label>
                        <input
                          className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary"
                          type="email"
                          defaultValue="alexander@veridian.com"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-semibold text-secondary-container mb-1.5 px-1">
                          Professional Bio
                        </label>
                        <textarea
                          className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary"
                          rows={3}
                          defaultValue="Senior Platform Administrator managing the curated heritage marketplace ecosystem."
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Team Management */}
                <section className="bg-surface-container-low p-8 rounded-xl">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-primary">
                      Team Management
                    </h3>
                    <button className="flex items-center gap-2 text-primary font-semibold text-sm hover:underline">
                      <User className="w-4 h-4" />
                      Add Staff Member
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-surface-container-lowest p-4 rounded-xl flex items-center justify-between transition-all hover:bg-surface-bright">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-primary font-bold">
                          SM
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-on-surface">
                            Sarah Miller
                          </p>
                          <p className="text-xs text-black">
                            Inventory Specialist • Active
                          </p>
                        </div>
                      </div>
                      <button className="text-outline hover:text-error transition-colors p-2">
                        <AlertTriangle className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="bg-surface-container-lowest p-4 rounded-xl flex items-center justify-between transition-all hover:bg-surface-bright">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-primary font-bold">
                          RK
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-on-surface">
                            Rahat Khan
                          </p>
                          <p className="text-xs text-black">
                            Support Admin • Active
                          </p>
                        </div>
                      </div>
                      <button className="text-outline hover:text-error transition-colors p-2">
                        <AlertTriangle className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </section>

                {/* Activity Log */}
                <section className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/15">
                  <h3 className="text-xl font-bold text-primary mb-6">
                    Activity Logs
                  </h3>
                  <div className="space-y-6">
                    <div className="flex gap-4 items-start relative pb-6 after:absolute after:left-2 after:top-8 after:bottom-0 after:w-px after:bg-outline-variant/30">
                      <div className="w-4 h-4 rounded-full bg-primary-container mt-1.5 shrink-0"></div>
                      <div>
                        <p className="text-sm font-medium">
                          Changed system password
                        </p>
                        <p className="text-xs text-outline mt-0.5">
                          2 hours ago • Chrome on MacOS
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start relative pb-6 after:absolute after:left-2 after:top-8 after:bottom-0 after:w-px after:bg-outline-variant/30">
                      <div className="w-4 h-4 rounded-full bg-secondary mt-1.5 shrink-0"></div>
                      <div>
                        <p className="text-sm font-medium">
                          New team member added: Sarah Miller
                        </p>
                        <p className="text-xs text-outline mt-0.5">
                          Yesterday at 4:32 PM
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-4 h-4 rounded-full bg-secondary mt-1.5 shrink-0"></div>
                      <div>
                        <p className="text-sm font-medium">
                          Logged in from new IP: 192.168.1.45
                        </p>
                        <p className="text-xs text-outline mt-0.5">
                          Oct 24, 2023 at 9:15 AM
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            )}
          </div>

          {/* Right Sidebar - Helpers & Status */}
          <div className="space-y-8">
            {/* Payment Tab Sidebar */}
            {activeTab === "payment" && (
              <>
                {/* Payment Health Widget */}
                <div className="bg-primary text-white rounded-xl p-6 shadow-xl shadow-primary/20">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="font-bold text-lg font-headline">
                        Payment Health
                      </h4>
                      <p className="text-primary-fixed text-xs">
                        Updated 2m ago
                      </p>
                    </div>
                    <Shield className="w-6 h-6 text-primary-fixed fill-primary-fixed" />
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <span className="text-xs opacity-80 uppercase font-bold">
                        Checkout Success Rate
                      </span>
                      <span className="text-xl font-extrabold font-headline tracking-tight">
                        98.4%
                      </span>
                    </div>
                    <div className="w-full bg-primary-container h-2 rounded-full overflow-hidden">
                      <div className="bg-primary-fixed h-full w-[98.4%]"></div>
                    </div>
                    <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] opacity-60 uppercase font-bold">
                          Avg Latency
                        </p>
                        <p className="text-sm font-bold">240ms</p>
                      </div>
                      <div>
                        <p className="text-[10px] opacity-60 uppercase font-bold">
                          Pending Payouts
                        </p>
                        <p className="text-sm font-bold">৳142,000</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security Tips Section */}
                <div className="bg-surface-container-low rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="w-5 h-5 text-tertiary" />
                    <h4 className="font-bold text-teal-950 font-headline">
                      Security Tips
                    </h4>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        Rotate your API secret keys every 90 days to minimize
                        data exposure risks.
                      </p>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        Ensure all webhook URLs use HTTPS for secure callback
                        data transmission.
                      </p>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        Enable 2FA for all administrator accounts with access to
                        payment settings.
                      </p>
                    </li>
                  </ul>
                  <a
                    className="mt-6 block text-center text-xs font-bold text-primary underline underline-offset-4"
                    href="#"
                  >
                    Read Full Security Audit
                  </a>
                </div>

                {/* Help Illustration */}
                <div className="relative rounded-xl overflow-hidden h-48 group">
                  <img
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDl14GnT0JmSGJ_Vjs6qedbfxcGq23o389aG5XtmIS2An5sPb9v_AsTz-CwBw6YMlwb62GOFyeCRGJcM5zfEvq0BXRoRut_MCVJGrigdk-N8l2GRVEYcAXwocHs9BaARv8A3bVpJgzgIpgTLQF0sMT2cNEt8Jf7RHELq2Bw0HTUGaCoM731sYLzQWe7vJPVuJyj40nCd8RtLopMsl9DL64PGmdPHPieuZy-xSzVSxhwZVy7BFB8fWJxxTTG-pIkd5RHe6CXXCCcWTib"
                    alt="Payment Gateway"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent flex flex-col justify-end p-4">
                    <p className="text-white font-bold text-sm">
                      Need help with Gateway setup?
                    </p>
                    <p className="text-primary-fixed text-[10px]">
                      Speak with our technical support team
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* Shipping Tab Sidebar */}
            {activeTab === "shipping" && (
              <>
                {/* Free Shipping Threshold */}
                <div className="bg-primary text-on-primary rounded-xl p-6 shadow-lg shadow-primary/20">
                  <h3 className="text-lg font-bold font-headline mb-4">
                    Free Shipping
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs opacity-80 block mb-2">
                        Order Value Threshold
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold">
                          ৳
                        </span>
                        <input
                          className="w-full bg-white/10 border-none rounded-lg py-3 pl-8 pr-4 text-xl font-extrabold focus:ring-2 focus:ring-on-primary-container text-white placeholder-white/50"
                          type="number"
                          defaultValue="2500"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg">
                      <input
                        defaultChecked
                        className="rounded text-primary-container focus:ring-0"
                        type="checkbox"
                      />
                      <span className="text-xs font-medium">
                        Enable auto-apply at checkout
                      </span>
                    </div>
                  </div>
                </div>

                {/* Policy Editor */}
                <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold font-headline text-teal-900">
                      Shipping Policy
                    </h3>
                    <Info className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="space-y-4">
                    <div className="bg-surface-container-high rounded-lg p-3 min-h-[200px] text-xs text-on-surface-variant leading-relaxed font-body italic border-l-4 border-primary">
                      All orders are processed within 1-2 business days. Orders
                      are not shipped or delivered on weekends or public
                      holidays. If we are experiencing a high volume of orders,
                      shipments may be delayed by a few days. Please allow
                      additional days in transit for delivery...
                    </div>
                    <button className="w-full py-2 border-2 border-primary text-primary font-bold text-xs rounded-lg hover:bg-primary hover:text-white transition-all uppercase tracking-wider">
                      Edit Full Policy
                    </button>
                  </div>
                </div>

                {/* Delivery Insights */}
                <div className="bg-secondary-container/30 rounded-xl p-6 border border-secondary-container">
                  <h4 className="text-sm font-bold text-teal-900 mb-3 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" /> Quick Stats
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-on-secondary-container">
                        Avg. Delivery (Inside)
                      </span>
                      <span className="font-bold">22.4 Hours</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-on-secondary-container">
                        Avg. Delivery (Outside)
                      </span>
                      <span className="font-bold">3.2 Days</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden mt-4">
                      <div className="bg-primary h-full w-[85%]"></div>
                    </div>
                    <p className="text-[10px] text-on-secondary-container/70 italic">
                      85% of orders meet target delivery times.
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* Account Tab Sidebar */}
            {activeTab === "account" && (
              <>
                {/* Security Settings */}
                <section className="bg-primary p-8 rounded-xl text-on-primary text-white">
                  <div className="flex items-center gap-3 mb-6 text-white">
                    <Shield className="w-6 h-6 text-primary-fixed" />
                    <h3 className="text-xl font-bold">Security Center</h3>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-primary-container/20 rounded-xl">
                      <div>
                        <p className="text-sm font-semibold">
                          2FA Authentication
                        </p>
                        <p className="text-xs opacity-70">
                          Requires mobile app code
                        </p>
                      </div>
                      <button className="w-12 h-6 bg-primary-fixed rounded-full relative p-1 flex items-center justify-end">
                        <div className="w-4 h-4 bg-primary rounded-full"></div>
                      </button>
                    </div>
                    <button className="w-full flex items-center justify-between p-4 bg-white/10 hover:bg-white/15 transition-colors rounded-xl text-left">
                      <span className="text-sm font-semibold">
                        Change Password
                      </span>
                      <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                    </button>
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-[10px] uppercase tracking-widest opacity-50 font-bold mb-4">
                        Notification Preferences
                      </p>
                      <div className="space-y-4">
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input
                            defaultChecked
                            className="rounded border-white/30 bg-transparent text-primary-fixed focus:ring-offset-primary"
                            type="checkbox"
                          />
                          <span className="text-sm group-hover:opacity-100 opacity-80">
                            Email Security Alerts
                          </span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input
                            defaultChecked
                            className="rounded border-white/30 bg-transparent text-primary-fixed focus:ring-offset-primary"
                            type="checkbox"
                          />
                          <span className="text-sm group-hover:opacity-100 opacity-80">
                            System Activity Reports
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Danger Zone */}
                <section className="bg-surface-container-low p-8 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="w-5 h-5 text-tertiary" />
                    <h3 className="text-lg font-bold text-tertiary">
                      Danger Zone
                    </h3>
                  </div>
                  <p className="text-xs text-secondary mb-6 leading-relaxed text-black">
                    Once you deactivate your account, there is no going back.
                    Please be certain before proceeding.
                  </p>
                  <button className="w-full py-3 px-4 border border-tertiary/30 text-tertiary font-semibold rounded-xl hover:bg-tertiary hover:text-white transition-all text-sm">
                    Deactivate Account
                  </button>
                </section>

                {/* Promo Card */}
              </>
            )}

            {/* General Tab Sidebar (Default) */}
            {activeTab === "general" && (
              <>
                {/* Settings Health */}
                <div className="p-8 bg-surface-container-low rounded-xl">
                  <h3 className="text-sm font-bold mb-4 uppercase tracking-widest text-on-surface-variant">
                    Settings Health
                  </h3>
                  <div className="space-y-5">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary fill-primary" />
                      <div>
                        <p className="text-xs font-bold">
                          Store Profile Complete
                        </p>
                        <p className="text-[10px] text-on-surface-variant">
                          All required identity fields are filled.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary fill-primary" />
                      <div>
                        <p className="text-xs font-bold">Payment Verified</p>
                        <p className="text-[10px] text-on-surface-variant">
                          Stripe integration is live and ready.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-tertiary" />
                      <div>
                        <p className="text-xs font-bold">Shipping Zones</p>
                        <p className="text-[10px] text-on-surface-variant">
                          Consider adding international zones for broader reach.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Two-Factor Auth */}
                <div className="p-8 bg-surface-container-lowest rounded-xl border border-outline-variant/10 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Shield className="w-20 h-20" />
                  </div>
                  <h3 className="text-sm font-bold mb-2">Two-Factor Auth</h3>
                  <p className="text-[11px] text-on-surface-variant mb-6 leading-relaxed">
                    Add an extra layer of security to your curator account by
                    enabling 2FA.
                  </p>
                  <button className="w-full py-2.5 rounded-lg text-[11px] font-bold bg-secondary-container text-on-secondary-container hover:bg-secondary-container/80 transition-all uppercase tracking-widest">
                    ENABLE NOW
                  </button>
                </div>

                {/* Curator Pro Tip */}
                <div className="p-6 bg-[#005344] rounded-xl text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="w-5 h-5 text-primary-fixed" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Curator Pro Tip
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed opacity-90">
                    "High-quality store descriptions can improve your SEO
                    visibility by up to 40% in local search rankings."
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Save Button (Mobile) */}
      <div className="fixed bottom-8 right-8 z-50 md:hidden">
        <button className="w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center active:scale-95 transition-transform">
          <Save className="w-6 h-6" />
        </button>
      </div>

      {/* Background Decoration */}
      <div className="fixed top-0 right-0 -z-10 w-1/3 h-screen opacity-10 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary blur-[120px] rounded-full"></div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
