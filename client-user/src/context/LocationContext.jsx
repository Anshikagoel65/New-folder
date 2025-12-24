import { createContext, useContext, useEffect, useState } from "react";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(
    localStorage.getItem("location") || "Detect location"
  );
  const [deliveryTime, setDeliveryTime] = useState(
    localStorage.getItem("deliveryTime") || null
  );
  const [address, setAddress] = useState(localStorage.getItem("address") || "");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("location", location);
    localStorage.setItem("address", address);
    localStorage.setItem("deliveryTime", deliveryTime);
  }, [location, address, deliveryTime]);

  return (
    <LocationContext.Provider
      value={{
        location,
        setLocation,
        deliveryTime,
        setDeliveryTime,
        address,
        setAddress,
        isModalOpen,
        setIsModalOpen,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocationContext must be used inside LocationProvider");
  }
  return context;
};
