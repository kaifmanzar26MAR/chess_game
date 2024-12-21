import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { getCurrentUser } from "../hooks/userHooks";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState(null);

  // Fetch current user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const tempUser = await getCurrentUser();
        setUser(tempUser);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  // Initialize socket connection when user changes
  useEffect(() => {
    if (user) {
      console.log("Initializing socket connection");

      const newSocket = io("http://localhost:9000", {
        query: {
          userId: user._id,
        },
      });

      setSocket(newSocket);

      return () => {
        console.log("Closing socket connection");
        newSocket.close();
      };
    } else if (socket) {
      console.log("No user found, closing socket");
      socket.close();
      setSocket(null);
    }
  }, [user]); // Re-run when `user` changes

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
