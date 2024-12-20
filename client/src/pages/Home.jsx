import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCurrentUser } from "../hooks/userHooks";

const Home = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    if (!username || username.trim() === "") {
      return;
    }
    console.log(username);
    const response = await axios.get(
      `http://localhost:9000/user/login/${username}`
    );
    if (response) {
      window.location.href = "http://localhost:5173/game";
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };

    fetchUser();
  }, []);

  if (user) {
    window.location.href = "http://localhost:5173/game";
  }

  return (
    <div className="w-full flex items-center justify-center h-[100vh] bg-gray-200">
      <div className="container w-full h-full  flex items-center justify-center relative overflow-hidden p-4">
        <div className="container flex items-center justify-center absolute h-full w-full top-0 left-0 bg-gray-400 bg-opacity-50">
          <img src="./lock.png" alt="logo" className="h-[59%] opacity-80"/>
        </div>
        <img src="./board_cont_.png" alt="board" className="h-full"/>
      </div>
      <div className="container w-[500px] bg-slate-300 h-full flex items-center justify-center">
        <div className="container w-full h-[500px] m-5 rounded bg-white shadow-sm flex items-center justify-center flex-wrap">
         <div className="header h-[200px]">
            <img src="./chess_log.jpg" alt="logo" className="w-[400px]"/>
         </div>
          <form
            action=""
            id="login_form"
            onSubmit={loginUser}
            className="w-full  p-4 flex items-center justify-center flex-col gap-5"
          >
            <label htmlFor="username" className="text-start w-full mb-[-4px]">Enter Your Name To Start the Game!</label>
            <input
              type="text"
              name="username"
              id="username"
              className="w-full block flex-1 border-4 rounded  bg-transparent py-3 pl-5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
              onChange={(e) => setUsername(e.target.value)}
            />
            <button type="submit" className="w-full rounded-md bg-indigo-600 py-3 pl-5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
