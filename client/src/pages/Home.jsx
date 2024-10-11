import React from 'react'

const Home = () => {
  return (
    <div>
        home
        <button onClick={()=>window.location.href= 'http://localhost:5173/game'}>Go to Game</button>
    </div>
    
  )
}

export default Home