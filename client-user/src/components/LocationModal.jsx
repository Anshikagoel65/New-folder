import { useState } from "react";
import { useLocationContext } from "../context/LocationContext";
import { X, Search, MapPin, Crosshair } from "lucide-react";

const LocationModal = () => {
  const { setAddress, setDeliveryTime, setIsModalOpen } = useLocationContext();
  const [input, setInput] = useState("");

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await res.json();

        const house = data.address.house_number || "";
        const road = data.address.road || "";
        const city =
          data.address.city || data.address.town || data.address.village || "";

        setAddress(`${house} ${road}, ${city}`);
        setDeliveryTime(10); // dynamic logic later
        setIsModalOpen(false);
      },
      () => {
        alert("Location permission denied");
      }
    );
  };

  const handleConfirmLocation = () => {
    if (!input.trim()) return;

    let time = 20;
    if (input.toLowerCase().includes("sector")) time = 10;
    if (input.toLowerCase().includes("village")) time = 30;

    setAddress(input);
    setDeliveryTime(time);
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Background Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={() => setIsModalOpen(false)}
      />

      {/* Modal */}
      <div
        className="
          fixed z-50 bg-[#f5f7fa]
          w-full
          bottom-0
          rounded-t-2xl
          p-4
          md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
          md:bottom-auto
          md:w-[520px]
          md:rounded-xl
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Select your Location</h2>
          <button onClick={() => setIsModalOpen(false)}>
            <X size={22} />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search delivery location"
            className="w-full pl-10 pr-3 py-2 border rounded-lg outline-none"
          />
        </div>

        {/* Detect location */}
        <button
          onClick={handleDetectLocation}
          className="w-full flex items-center gap-2 text-green-600 font-medium bg-white py-3 rounded-lg mb-4"
        >
          <Crosshair size={18} />
          Use current location
        </button>

        {/* Saved addresses */}
        <div className="text-sm text-gray-500 mb-2">Your saved addresses</div>

        <div className="max-h-[40vh] overflow-y-auto space-y-3">
          {[
            "89, Akbari Rd, Muzaffarnagar",
            "12 Chimpiawara, West Nabab Ganj",
            "Gh-7 Tower 9, Ghaziabad",
          ].map((addr, i) => (
            <div
              key={i}
              onClick={() => {
                setAddress(addr);
                setDeliveryTime(15);
                setIsModalOpen(false);
              }}
              className="bg-white p-3 rounded-lg flex gap-3 cursor-pointer hover:bg-gray-100"
            >
              <MapPin size={18} className="text-gray-600 mt-1" />
              <div>
                <p className="font-medium">Home</p>
                <p className="text-xs text-gray-500">{addr}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Confirm button (mobile friendly) */}
        <button
          onClick={handleConfirmLocation}
          className="w-full bg-black text-white py-3 rounded-lg mt-4"
        >
          Confirm location
        </button>
      </div>
    </>
  );
};

export default LocationModal;
