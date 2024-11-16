import React, { useState } from 'react'
import axios from 'axios';
import { getCurrentUser } from '../hooks/userHooks';

const Home =async () => {

  const user = await getCurrentUser();
  if(user){
    window.location.href="http://localhost:5173/game";
  }
const [username, setUsername] = useState("");
const loginUser = async (e)=>{
  e.preventDefault();
  if(!username || username.trim()===""){
    return;
  }
  const response = await axios.get(`http://localhost:9000/user/login/${username}`);
  if(response){
    window.location.href=  "http://localhost:5173/game";
  }
}
  return (
    <div>
        login

        <form action="" id="login_form" onSubmit={loginUser}>
          <input type="text" name="username" id="username" onChange={(e)=>setUsername(e.target.value)}/>
          <button type='submit'>Login</button>
        </form>

        {/* <button onClick={()=>window.location.href= 'http://localhost:5173/game'}>Go to Game</button> */}
    </div>
    
  )
}

export default Home