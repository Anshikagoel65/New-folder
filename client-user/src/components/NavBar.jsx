import React from "react";
import { Link } from "react-router-dom";
import LocationModal from "./LocationModal";
import { useLocationContext } from "../context/LocationContext";
import { Search, MapPin, ChevronDown, User } from "lucide-react";
import LoginModal from "./LoginModal";
import { useAuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { address, deliveryTime, setIsModalOpen, isModalOpen } =
    useLocationContext();

  const { isLoginOpen, setIsLoginOpen } = useAuthContext();
  const showDeliveryTime = !!address;

  return (
    <>
      <nav className="w-full bg-white shadow-md z-50">
        {/* ================= DESKTOP ================= */}
        <div className="hidden md:flex items-center justify-between px-8 h-20">
          {/* Left */}
          <div className="flex items-center gap-14">
            <h1 className="text-4xl font-extrabold text-green-600">
              Flick<span className="text-black">Bee</span>
            </h1>

            <div
              className="cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              {showDeliveryTime && (
                <p className="text-lg font-bold">
                  Delivery in {deliveryTime} minutes
                </p>
              )}
              <div className="flex items-center gap-1 text-gray-700">
                <MapPin size={18} />
                <span className="underline decoration-dotted max-w-[220px] truncate">
                  {address || "Detect location"}
                </span>
                <ChevronDown size={16} />
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-[700px] mx-10 relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full bg-gray-50 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>

          {/* Right */}
          <div className="flex items-center gap-10">
            <button
              onClick={() => setIsLoginOpen(true)}
              className="text-gray-700 text-lg font-medium"
            >
              Login
            </button>

            <Link
              to="/cart"
              className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold"
            >
              My Cart
            </Link>
          </div>
        </div>

        {/* ================= MOBILE ================= */}
        <div className="md:hidden px-4 py-3">
          {/* Top Row */}
          <div className="flex items-center justify-between">
            <div
              className="cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <p className="text-sm font-semibold">
                {showDeliveryTime
                  ? `Delivery in ${deliveryTime} minutes`
                  : "Currently unavailable"}
              </p>

              <div className="flex items-center gap-1 text-xs text-gray-600 max-w-[260px] truncate">
                <MapPin size={14} />
                <span>{address || "Detect location"}</span>
                <ChevronDown size={14} />
              </div>
            </div>

            {/* User Icon */}
            <button
              onClick={() => setIsLoginOpen(true)}
              className="text-gray-700 text-lg font-medium"
            >
              <User />
            </button>
          </div>

          {/* Search Bar */}
          <div className="mt-3 relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              placeholder="Search for products"
              className="w-full bg-gray-50 pl-10 pr-4 py-2 border rounded-lg focus:outline-none"
            />
          </div>
        </div>
      </nav>

      {/* Location Modal */}
      {isModalOpen && <LocationModal />}
      {isLoginOpen && <LoginModal />}
    </>
  );
};

export default NavBar;
