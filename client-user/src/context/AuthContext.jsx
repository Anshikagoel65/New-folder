import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        isLoginOpen,
        setIsLoginOpen,
        mobile,
        setMobile,
        otpSent,
        setOtpSent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
