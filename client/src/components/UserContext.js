import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  // Initialize user data from localStorage or empty strings
  const [userId, setUserId] = useState(
    localStorage.getItem("userId") || ""
  );
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || ""
  );
  const [isFaculty,setIsFaculty]=useState(localStorage.getItem("isFaculty") || false
  );

  

  // Initialize coordinates
  

  // Attempt to get the user's current location and update coordinates


  // Save user data to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("userId", userId);
      localStorage.setItem("userName", userName);
      localStorage.setItem("isFaculty",isFaculty)
    } catch (error) {
      console.error("Error saving user data to localStorage:", error);
    }
  }, [userId, userName, isFaculty]);

  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        userName,
        setUserName,
        isFaculty,
        setIsFaculty
        
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
