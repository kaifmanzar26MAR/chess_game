import axios from "axios"

const getCurrentUser = async () => {
    try {
        const response = await axios.get("http://localhost:9000/user/get_current_user", {
            withCredentials: true, 
            headers: {
              "Content-Type": "application/json", 
            },
          });
        return response.data.data || null; 
    } catch (error) {
        console.error("Error fetching current user:", error);
        return null; 
    }
};




export {getCurrentUser};