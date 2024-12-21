import { useEffect, useState } from 'react'
import { useSocketContext } from '../context/SocketContext'
import { getCurrentUser } from './userHooks';

const default_board = [
    [
      {
        name: "Rook",
        color: "black",
        background: "",
        icon: "./black/icons/rook_black.png",
      },
      {
        name: "Knight",
        color: "black",
        background: "",
        icon: "./black/icons/knight_black.png",
      },
      {
        name: "Bishop",
        color: "black",
        background: "",
        icon: "./black/icons/bishop_black.png",
      },
      {
        name: "Queen",
        color: "black",
        background: "",
        icon: "./black/icons/queen_black.png",
      },
      {
        name: "King",
        color: "black",
        background: "",
        icon: "./black/icons/king_black.png",
      },
      {
        name: "Bishop",
        color: "black",
        background: "",
        icon: "./black/icons/bishop_black.png",
      },
      {
        name: "Knight",
        color: "black",
        background: "",
        icon: "./black/icons/knight_black.png",
      },
      {
        name: "Rook",
        color: "black",
        background: "",
        icon: "./black/icons/rook_black.png",
      },
    ],
    Array(8).fill({
      name: "Pawn",
      color: "black",
      background: "",
      icon: "./black/icons/pawn_black.png",
    }),
    Array(8).fill({ name: "", color: "", background: "", icon: "" }), // Empty rows
    Array(8).fill({ name: "", color: "", background: "", icon: "" }),
    Array(8).fill({ name: "", color: "", background: "", icon: "" }),
    Array(8).fill({ name: "", color: "", background: "", icon: "" }),
    Array(8).fill({
      name: "Pawn",
      color: "white",
      background: "",
      icon: "./white/icons/pawn_red.png",
    }),
    [
      {
        name: "Rook",
        color: "white",
        background: "",
        icon: "./white/icons/rook_red.png",
      },
      {
        name: "Knight",
        color: "white",
        background: "",
        icon: "./white/icons/knight_red.png",
      },
      {
        name: "Bishop",
        color: "white",
        background: "",
        icon: "./white/icons/bishop_red.png",
      },
      {
        name: "King",
        color: "white",
        background: "",
        icon: "./white/icons/king_red.png",
      },
      {
        name: "Queen",
        color: "white",
        background: "",
        icon: "./white/icons/queen_red.png",
      },
      {
        name: "Bishop",
        color: "white",
        background: "",
        icon: "./white/icons/bishop_red.png",
      },
      {
        name: "Knight",
        color: "white",
        background: "",
        icon: "./white/icons/knight_red.png",
      },
      {
        name: "Rook",
        color: "white",
        background: "",
        icon: "./white/icons/rook_red.png",
      },
    ],
  ];

const useListionMessage = () => {
  const {socket} = useSocketContext();

  const [allChats,setAllChats] =useState([]);

  useEffect(()=>{
    console.log('new message');
    socket?.on("newMessage",(newMessage)=>{
        setAllChats([...allChats,newMessage]);
    })
    return ()=> socket?.off("newMessage");
  },[socket, setAllChats, allChats]);

  return {allChats, setAllChats}
}

const useListionUserUpdate = () =>{
    const {socket} = useSocketContext();
    const [user, setUser] = useState(null);
    const [board, setBoard] = useState(default_board);
    const [currentTurn, setCurrentTurn] = useState(null);
    useEffect(()=>{
        console.log('user Board update');
        socket?.on("updatedUser",async ()=>{
            const updated_user = await getCurrentUser();
            if(!updated_user.opponent){
                window.location.reload();
            }else{
                setUser(updated_user);
                setBoard(updated_user?.board);
                setCurrentTurn(updated_user?.turn?.color);
            }
        })
        return ()=> socket?.off("updatedUser");
    },[socket, setUser, user, board, setBoard, currentTurn, setCurrentTurn]);

    return {user, setUser, board, setBoard, currentTurn, setCurrentTurn}
}

export  {useListionMessage, useListionUserUpdate};