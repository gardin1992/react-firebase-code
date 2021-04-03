import { useState, useEffect, createContext } from "react";
import FirebaseAuth from "src/services/firebase/auth";

export const UserContext = createContext({ user: null });

export default function UserProvider({ children }) {
  const [user, setuser] = useState(null);
  useEffect(() => {
    FirebaseAuth.onAuthStateChanged(async (user) => {
      if (!user) return;
      const { displayName, email } = user;
      setuser({
        displayName,
        email,
      });
    });
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
