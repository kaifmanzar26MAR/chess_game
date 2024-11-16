import axios from "axios";

const getCurrentUser = async () => {
  try {
    const response = await axios.get(
      "http://localhost:9000/user/get_current_user",
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.data || null;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
};

const updateTurn = async (board) => {

  try {
    const data = JSON.stringify({board});
    const response = await axios.post(
      "http://localhost:9000/user/update_user_trun",
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }   
};

const logout = async () =>{
  try {
    const response = await axios.get(
      "http://localhost:9000/user/logout",
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if(response){
        window.location.href = "http://localhost:5173/";
      }
  } catch (error) {
    console.log(error);
  }
}

export { getCurrentUser, updateTurn, logout};
