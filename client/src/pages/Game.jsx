import React, { useEffect, useState } from "react";
import { getCurrentUser, updateTurn, logout } from "../hooks/userHooks";
import axios from "axios";
import { gameOverListioner, useListionMessage, useListionUserUpdate } from "../hooks/useListing";
const Game = () => {
  
  const {user, setUser} = useListionUserUpdate();
  const [selectedPiece, setSelectedPiece] = useState({ i: null, j: null });
  const {currentTurn, setCurrentTurn} = useListionUserUpdate();
  const [updateResponse, setUpdateResponse] = useState(null);
  const [validPathArray, setValidPathArray] = useState([]);
  
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

  const {board, setBoard} = useListionUserUpdate();
  const {gameOverMessage, setGameOverMessage} = gameOverListioner();
  const {allChats, setAllChats} =useListionMessage();

  //* This function clear the hilighted path
  const clearPathMarks = () => {
    console.log("clearing path");
    setValidPathArray([]);
    const all_path_ele = document.getElementsByClassName("path_ele");
    Array.from(all_path_ele).forEach((ele) => {
      ele.style.backgroundColor = "";
      ele.classList.remove("path_ele");
    });
  };

  //* Checking the move is on the correct path or not
  const isCorrectPath = (i, j) => {
    setSelectedPiece({ i: null, j: null });
    console.log(validPathArray);
    if (validPathArray?.some((path) => path.i === i && path.j === j)) {
      console.log("valid path");
      return true;
    }
    console.log("not valid path");
    return false;
  };

  //* showing uppper path or the continous mover
  const showUpperPath = (a, b, i, j) => {
    if (a < 0) return;

    if (board[a][b].name !== "" && board[a][b].color === board[i][j].color) {
      return;
    }
    const path_ele = document.getElementById(`${a}_${b}`);
    if (path_ele) {
      let tempPathArray = validPathArray;
      tempPathArray.push({ i: a, j: b });
      setValidPathArray(tempPathArray);
      path_ele.classList.add("path_ele");
      if (board[a][b].name !== "" && board[a][b].color !== board[i][j].color) {
        path_ele.style.backgroundColor = "#c6432d";
        return;
      } else {
        path_ele.style.backgroundColor = "#85e285";
      }
      showUpperPath(a - 1, b, i, j);
    }
  };

  //*showing the lower the for the continous mover
  const showLowerPath = (a, b, i, j) => {
    if (a >= board.length) return;

    if (board[a][b].name !== "" && board[a][b].color === board[i][j].color) {
      return;
    }
    const path_ele = document.getElementById(`${a}_${b}`);
    if (path_ele) {
      let tempPathArray = validPathArray;
      tempPathArray.push({ i: a, j: b });
      setValidPathArray(tempPathArray);
      path_ele.classList.add("path_ele");
      if (board[a][b].name !== "" && board[a][b].color !== board[i][j].color) {
        path_ele.style.backgroundColor = "#c6432d";
        return;
      } else {
        path_ele.style.backgroundColor = "#85e285";
      }
      showLowerPath(a + 1, b, i, j);
    }
  };

  //*showing the Let the for the continous mover
  const showLeftPath = (a, b, i, j) => {
    if (b < 0) return;

    if (board[a][b].name !== "" && board[a][b].color === board[i][j].color) {
      return;
    }
    const path_ele = document.getElementById(`${a}_${b}`);
    if (path_ele) {
      let tempPathArray = validPathArray;
      tempPathArray.push({ i: a, j: b });
      setValidPathArray(tempPathArray);
      path_ele.classList.add("path_ele");
      if (board[a][b].name !== "" && board[a][b].color !== board[i][j].color) {
        path_ele.style.backgroundColor = "#c6432d";
        return;
      } else {
        path_ele.style.backgroundColor = "#85e285";
      }
      showLeftPath(a, b - 1, i, j);
    }
  };

  //*showing the Rigth the for the continous mover
  const showRightPath = (a, b, i, j) => {
    if (b >= board.length) return;

    if (board[a][b].name !== "" && board[a][b].color === board[i][j].color) {
      return;
    }
    const path_ele = document.getElementById(`${a}_${b}`);
    if (path_ele) {
      let tempPathArray = validPathArray;
      tempPathArray.push({ i: a, j: b });
      setValidPathArray(tempPathArray);
      path_ele.classList.add("path_ele");
      if (board[a][b].name !== "" && board[a][b].color !== board[i][j].color) {
        path_ele.style.backgroundColor = "#c6432d";
        return;
      } else {
        path_ele.style.backgroundColor = "#85e285";
      }
      showRightPath(a, b + 1, i, j);
    }
  };

  //*showing the digonlly left down path the for the continous mover
  const digonallyLeftDown = (a, b, i, j) => {
    // Check boundaries for an 8x8 board
    if (b < 0 || a >= 8) return;

    if (board[a][b].name !== "" && board[a][b].color === board[i][j].color) {
      return;
    }
    const path_ele = document.getElementById(`${a}_${b}`);
    if (path_ele) {
      let tempPathArray = validPathArray;
      tempPathArray.push({ i: a, j: b });
      setValidPathArray(tempPathArray);
      path_ele.classList.add("path_ele");

      if (
        board[a][b]?.name !== "" &&
        board[a][b]?.color !== board[i][j].color
      ) {
        path_ele.style.backgroundColor = "#c6432d";
        return;
      } else {
        path_ele.style.backgroundColor = "#85e285";
      }
      digonallyLeftDown(a + 1, b - 1, i, j); // Move diagonally left-down
    }
  };

  //*showing the digonlly left Up path the for the continous mover
  const digonallyLeftUp = (a, b, i, j) => {
    // Check boundaries for an 8x8 board
    if (b < 0 || a < 0) return;

    if (board[a][b]?.name !== "" && board[a][b]?.color === board[i][j].color) {
      return;
    }
    const path_ele = document.getElementById(`${a}_${b}`);
    if (path_ele) {
      let tempPathArray = validPathArray;
      tempPathArray.push({ i: a, j: b });
      setValidPathArray(tempPathArray);
      path_ele.classList.add("path_ele");

      if (board[a][b].name !== "" && board[a][b].color !== board[i][j].color) {
        path_ele.style.backgroundColor = "#c6432d";
        return;
      } else {
        path_ele.style.backgroundColor = "#85e285";
      }
      digonallyLeftUp(a - 1, b - 1, i, j); // Move diagonally left-up
    }
  };

  //*showing the digonlly Right down path the for the continous mover
  const digonallyRightDown = (a, b, i, j) => {
    // Check boundaries for an 8x8 board
    if (b >= 8 || a >= 8) return;

    if (board[a][b].name !== "" && board[a][b].color === board[i][j].color) {
      return;
    }
    const path_ele = document.getElementById(`${a}_${b}`);
    if (path_ele) {
      let tempPathArray = validPathArray;
      tempPathArray.push({ i: a, j: b });
      setValidPathArray(tempPathArray);
      path_ele.classList.add("path_ele");

      if (
        board[a][b]?.name !== "" &&
        board[a][b]?.color !== board[i][j].color
      ) {
        path_ele.style.backgroundColor = "#c6432d";
        return;
      } else {
        path_ele.style.backgroundColor = "#85e285";
      }
      digonallyRightDown(a + 1, b + 1, i, j); // Move diagonally right-down
    }
  };

  //*showing the digonlly Right up path the for the continous mover
  const digonallyRightUp = (a, b, i, j) => {
    if (b >= 8 || a < 0) return;

    if (board[a][b]?.name !== "" && board[a][b]?.color === board[i][j].color) {
      return;
    }
    const path_ele = document.getElementById(`${a}_${b}`);
    if (path_ele) {
      let tempPathArray = validPathArray;
      tempPathArray.push({ i: a, j: b });
      setValidPathArray(tempPathArray);
      path_ele.classList.add("path_ele");

      if (board[a][b].name !== "" && board[a][b].color !== board[i][j].color) {
        path_ele.style.backgroundColor = "#c6432d";
        return;
      } else {
        path_ele.style.backgroundColor = "#85e285";
      }
      digonallyRightUp(a - 1, b + 1, i, j);
    }
  };

  //*showing Pawn path
  const showPawnPath = (i, j) => {
    //clearing previous path
    clearPathMarks();
    console.log("showing Pawn path");

    const next_index = (a, b) => {
      if (board[i][j].color === "white") {
        return a - b;
      } else {
        return a + b;
      }
    };
    let tempPathArray = [];
    if (i == 1 || i == 6) {
      //on start possition
      for (let k = 1; k <= 2; k++) {
        const index = next_index(i, k);
        const path_ele = document.getElementById(`${index}_${j}`);
        if (index >= board.length || index < 0) {
          break;
        }
        // checkOponentforRock(index,j);

        tempPathArray.push({ i: index, j });
        if (
          (board[index][j - 1]?.name !== "" &&
            board[index][j - 1]?.color !== board[i][j].color) ||
          (board[index][j + 1]?.name !== "" &&
            board[index][j + 1]?.color !== board[i][j].color)
        ) {
          if (board[index][j - 1]?.name !== "") {
            const opponent = document.getElementById(`${index}_${j - 1}`);
            if (opponent && board[i][j]?.color !== board[index][j - 1]?.color) {
              opponent.classList.add("path_ele");
              opponent.style.backgroundColor = "#c6432d";
              tempPathArray.push({ i: index, j: j - 1 });
              console.log("oponent detected in Pawn path");
            }
          }
          if (board[index][j + 1]?.name !== "") {
            const opponent = document.getElementById(`${index}_${j + 1}`);
            if (opponent && board[i][j]?.color !== board[index][j + 1]?.color) {
              opponent.classList.add("path_ele");
              opponent.style.backgroundColor = "#c6432d";
              tempPathArray.push({ i: index, j: j + 1 });
              console.log("oponent detected in Pawn path");
            }
          }
        }
        if (board[index][j].name === "") {
          if (path_ele) {
            path_ele.classList.add("path_ele");
          }
          path_ele.style.backgroundColor = "#85e285";
        }
      }
    } else {
      for (let k = 1; k <= 1; k++) {
        const index = next_index(i, k);
        // checking for opponent
        if (index >= board.length || index < 0) {
          break;
        }

        // checkOponentforRock(index,j);
        const path_ele = document.getElementById(`${index}_${j}`);

        tempPathArray.push({ i: index, j });
        if (
          (board[index][j - 1]?.name !== "" &&
            board[index][j - 1]?.color !== board[i][j].color) ||
          (board[index][j + 1]?.name !== "" &&
            board[index][j + 1]?.color !== board[i][j].color)
        ) {
          if (board[index][j - 1]?.name !== "") {
            const opponent = document.getElementById(`${index}_${j - 1}`);
            if (opponent) {
              opponent.classList.add("path_ele");
              opponent.style.backgroundColor = "#c6432d";
              tempPathArray.push({ i: index, j: j - 1 });
              console.log("oponent detected in Pawn path");
            }
          }
          if (board[index][j + 1]?.name !== "") {
            const opponent = document.getElementById(`${index}_${j + 1}`);
            if (opponent) {
              opponent.classList.add("path_ele");
              opponent.style.backgroundColor = "#c6432d";
              tempPathArray.push({ i: index, j: j + 1 });
              console.log("oponent detected in Pawn path");
            }
          }
        }
        if (board[index][j].name === "") {
          if (path_ele) {
            path_ele.classList.add("path_ele");
          }
          path_ele.style.backgroundColor = "#85e285";
        }
      }
    }
    console.log(tempPathArray);
    setValidPathArray(tempPathArray);
  };

  //*Showing the rook path
  const showRookPath = (i, j) => {
    console.log("showing Rook Path");

    showUpperPath(i - 1, j, i, j);
    showLowerPath(i + 1, j, i, j);
    showLeftPath(i, j - 1, i, j);
    showRightPath(i, j + 1, i, j);
  };

  //* Showing BishopPaht
  const showBishopPath = (i, j) => {
    console.log("showing Bishop Path");
    digonallyRightUp(i - 1, j + 1, i, j);
    digonallyRightDown(i + 1, j + 1, i, j);
    digonallyLeftDown(i + 1, j - 1, i, j);
    digonallyLeftUp(i - 1, j - 1, i, j);
  };

  //*Showing Queen Paht
  const showQueenPath = (i, j) => {
    console.log("showing Queen Path");
    digonallyRightUp(i - 1, j + 1, i, j);
    digonallyRightDown(i + 1, j + 1, i, j);
    digonallyLeftDown(i + 1, j - 1, i, j);
    digonallyLeftUp(i - 1, j - 1, i, j);
    showUpperPath(i - 1, j, i, j);
    showLowerPath(i + 1, j, i, j);
    showLeftPath(i, j - 1, i, j);
    showRightPath(i, j + 1, i, j);
  };

  //* Showing Knight Path
  const showKnightPath = (i, j) => {
    console.log("showing Knight Paht");
    const knightMoves = [
      { a: i - 2, b: j - 1 }, // up 2, left 1
      { a: i - 2, b: j + 1 }, // up 2, right 1
      { a: i - 1, b: j - 2 }, // up 1, left 2
      { a: i - 1, b: j + 2 }, // up 1, right 2
      { a: i + 1, b: j - 2 }, // down 1, left 2
      { a: i + 1, b: j + 2 }, // down 1, right 2
      { a: i + 2, b: j - 1 }, // down 2, left 1
      { a: i + 2, b: j + 1 }, // down 2, right 1
    ];

    knightMoves.forEach((move) => {
      const { a, b } = move;
      if (
        a >= 0 &&
        a < 8 &&
        b >= 0 &&
        b < 8 &&
        (board[a][b].name === "" || board[a][b].color !== board[i][j].color)
      ) {
        // Ensure within bounds

        const path_ele = document.getElementById(`${a}_${b}`);
        if (path_ele) {
          let tempPathArray = validPathArray;
          tempPathArray.push({ i: a, j: b });
          setValidPathArray(tempPathArray);
          path_ele.classList.add("path_ele");

          if (
            board[a][b].name !== "" &&
            board[a][b].color !== board[i][j].color
          ) {
            path_ele.style.backgroundColor = "#c6432d";
          } else {
            path_ele.style.backgroundColor = "#85e285";
          }
        }
      }
    });
  };

  //* Shoing King Paht
  const showKingPath = (i, j) => {
    const kingMoves = [
      { a: i - 1, b: j - 1 }, // upper left
      { a: i - 1, b: j }, // upper
      { a: i - 1, b: j + 1 }, // upper right
      { a: i, b: j - 1 }, // left
      { a: i, b: j + 1 }, // right
      { a: i + 1, b: j - 1 }, // lower left
      { a: i + 1, b: j }, // lower
      { a: i + 1, b: j + 1 }, // lower right
    ];

    kingMoves.forEach((move) => {
      const { a, b } = move;
      if (
        a >= 0 &&
        a < 8 &&
        b >= 0 &&
        b < 8 &&
        (board[a][b].name === "" || board[a][b].color !== board[i][j].color)
      ) {
        const path_ele = document.getElementById(`${a}_${b}`);
        if (path_ele) {
          let tempPathArray = validPathArray;
          tempPathArray.push({ i: a, j: b });
          setValidPathArray(tempPathArray);
          path_ele.classList.add("path_ele");

          if (
            board[a][b].name !== "" &&
            board[a][b].color !== board[i][j].color
          ) {
            path_ele.style.backgroundColor = "#c6432d"; // Enemy piece (capturable)
          } else if (board[a][b].name === "") {
            path_ele.style.backgroundColor = "#85e285"; // Empty square
          }
        }
      }
    });
  };

  //* This function check the Pice and show the path as per it and also validate the user and opponent
  const showPath = (i, j) => {
    const peice = board[i][j];
    console.log(peice.name);
    switch (peice.name) {
      case "Pawn":
        showPawnPath(i, j);
        break;
      case "Rook":
        showRookPath(i, j);
        break;
      case "Bishop":
        showBishopPath(i, j);
        break;
      case "Queen":
        showQueenPath(i, j);
        break;
      case "Knight":
        showKnightPath(i, j);
        break;
      case "King":
        showKingPath(i, j);
        break;
    }
  };

  //*Resetting the board
  const resetBoard = async () => {
    setBoard(default_board);
    await updateTurn(default_board);
  };

  //*game over message show
  const GameOverMessageShow = async (winner, reason) =>{
    let losser_message = `Game Over!, ${winner} won the game!!. `;
    let winner_message = `Game Over!, You won the game!!.`;
    if(reason == "king_killer"){
      losser_message += "He Kill's your King!!";
    }else if(reason == "check_mate"){
      losser_message += "He check-mate you!";
    }else if(reason == "time_out"){
      losser_message += "You have taken very long time to take your move!";
    }

    const response = await axios.post('http://localhost:9000/user/game_over',{message : {losser_message, winner_message}, board: default_board},
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
    if(!response){
      console.log("Unable to send game over message!");
    }
  }

  //* This function handle the action on move
  const action = async (i, j) => {
    if (user.username !== user.turn.username) return false;

    const prev_i = selectedPiece.i,
      prev_j = selectedPiece.j;
    console.log(currentTurn);

    if (prev_i !== null && prev_j !== null) {
      const prevElement = document.getElementById(`${prev_i}_${prev_j}`);
      if (prevElement) {
        prevElement.classList.remove("selected");
      }
      if (
        board[i][j].color !== board[prev_i][prev_j].color &&
        !isCorrectPath(i, j)
      ) {
        //checking the valid paths
        console.log("not valid path");
        setSelectedPiece((prev) => ({ ...prev, i: null, j: null }));
        document.getElementById(`${i}_${j}`).classList.remove("selected");
        clearPathMarks();
        return;
      } else if (board[i][j].color === board[prev_i][prev_j].color) {
        // if both form the same color
        setSelectedPiece((prev) => ({ ...prev, i: null, j: null }));
        document.getElementById(`${i}_${j}`).classList.remove("selected");
        clearPathMarks();
        console.log("same color");
        console.log("setting i,j", i, j);
        setSelectedPiece({ i, j });
        document.getElementById(`${i}_${j}`).classList.add("selected");
        showPath(i, j);
        return;
      } else if (
        board[i][j].name != "" &&
        board[i][j].color !== board[prev_i][prev_j].color
      ) {
        // if both of opposit color
        if (board[i][j].name === "King") {
          console.log(board[i][j].color, "king dead... Game over");
          const winner = (board[i][j].color != user.color
            ? user.username
            : user.opponent.username);
          GameOverMessageShow(winner, "king_killer");
          // alert(
          //   "Game Over!! " + winner + ", Won the Game!!"
          // );
          // resetBoard();
          // setUpdateResponse(updateTurn());
        } else {
          board[i][j] = board[prev_i][prev_j];
          board[prev_i][prev_j] = {
            name: "",
            color: "",
            background: "",
            icon: "",
          };
          const next_turn = currentTurn === "white" ? "black" : "white";
          const res = await updateTurn(board);
          setUpdateResponse(res);
        }

        clearPathMarks();
        console.log("opposit color kill other");
        setSelectedPiece((prev) => ({ ...prev, i: null, j: null }));
        document.getElementById(`${i}_${j}`).classList.remove("selected");
        return;
      } else {
        // path is empty;
        let tempBoard = board[i][j];
        board[i][j] = board[prev_i][prev_j];
        board[prev_i][prev_j] = tempBoard;
        console.log("forward moving");
        clearPathMarks();
        const next_turn = currentTurn === "white" ? "black" : "white";
        const res = await updateTurn(board);
        setUpdateResponse(res);
        setSelectedPiece((prev) => ({ ...prev, i: null, j: null }));
        return;
      }
    } else {
      if (board[i][j].name === "") {
        return;
      }

      if (currentTurn !== board[i][j].color) {
        console.log("It's ", currentTurn, "turn");
        return;
      }

      console.log("setting i,j", i, j);
      setSelectedPiece({ i, j });
      document.getElementById(`${i}_${j}`).classList.add("selected");
      showPath(i, j);
    }
  };

  //* Send the smessage to the opponent
  const addMessage = async (e) => {
    e.preventDefault();
    let text = document.getElementById("message").value;
    setAllChats([...allChats, { sender: user._id, message: text }]);
    document.getElementById("message").value = "";
    const response = await axios.post('http://localhost:9000/message/send_messaage',{message : text},
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    if(!response){
      console.log("error");
    }
  };


  //* Logout the game
  const logoutFunction = async () => {
    await logout();
  };

  //* A quit function must be introduce here

  //* On page lod events handling
  useEffect(() => {

    //*Fecthing the details of the current user
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      if (currentUser) {
        setCurrentTurn(currentUser.turn.color);

        // setCurrentTurn(currentUser.turn.color === currentUser.color && currentUser.color === 'white' ? 'black' : 'white');
        setBoard(currentUser.board || default_board);
      }
    };

    //* Fechignt the message on the basis of the paired user and oppeonent
    const fetchMessage = async () =>{
      const messages = await axios.post("http://localhost:9000/message/get_message", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if(!messages){
        console.log("message error");
      }
      const res_data = messages.data.data.all_message ? messages.data.data.all_message : [];
      setAllChats(res_data);
      
    }

    fetchUser();
    fetchMessage();
  }, [updateResponse]);

  useEffect(()=>{
    if(!gameOverMessage && gameOverMessage.trim() == ""){
      return;
    }
    alert(gameOverMessage);
    window.location.reload();
    return ()=>{}
  },[gameOverMessage, setGameOverMessage])

  //* Show loading if no user persent
  if (!user) {
    return <><div className="game_container h-[100vh] w-full flex items-center justify-center"><img src="./loading.webp" alt="loading" className="w-[200px]" /></div></>;
  }

  //*Show finding opponent if no opponent present
  if (!user.opponent) {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center relative ">
        <div
          className="username flex gap-4 items-center justify-center w-[300px] cursor-pointer bg-slate-200 rounded hover:bg-slate-300 text-black p-2 absolute top-5 left-5"
          titile="logout"
          onClick={logoutFunction}
        >
          <img src="./shutdown.png" alt="logout" className="w-14" />
          <p className="font-semibold text-2xl">
            Hi! {user.username.toUpperCase()}
          </p>
        </div>
        <div className="flex items-center justify-center flex-col">
          <img
            src="./searching_gif.gif"
            alt="search_icon"
            className="w-[200px]"
          />
          <p className="text-4xl">Searching for Opponent!!</p>
        </div>
      </div>
    );
  }

  //*Setting message on the basis of thee user turn
  const user_turn_message = "It's your turn!, " + user.username.toUpperCase();
  const opponent_turn_message =
    "It's " + user.turn.username.toUpperCase() + " turn!";


  return (
    <div className="game_container">

      {/* Side bar start */}
      <div style={{ color: "white" }} className="side_bar">

        {/*   Sidebar info section start */}
        <div className="side_bar_container flex gap-5 flex-col p-8">

             {/* Game logo */}
          <div className="logo">
            <img src="./chess_log.jpg" alt="logo" className="w-full rounded" />
          </div>

          {/*   Logot function and current turn status */}
          <div
            className="username flex gap-4 items-center justify-center w-full cursor-pointer bg-slate-200 rounded hover:bg-slate-300 text-black p-2"
            titile="logout"
            onClick={logoutFunction}
          >
            <img src="./shutdown.png" alt="logout" className="w-14" />
            <p className="font-semibold text-2xl">
              Hi! {user.username.toUpperCase()}
            </p>
          </div>

          {/*   Time counter */}
          <div className="turn_cont flex items-center justify-center flex-col text-black bg-slate-200 rounded">
            {/* <div
              className="timmer text-center text-5xl font-bold"
              id="time_show"
            >
            </div> */}
            <p
              className={`turn_box font-semibold ${
                user.turn.username === user.username
                  ? "text-green-800"
                  : "text-orange-800"
              }`}
            >
              {user.turn.username === user.username
                ? user_turn_message
                : opponent_turn_message}{" "}
            </p>
          </div>


        </div>
           {/* Sidebar info section end */}

        {/*   Sidebar chat section start */}
        <div className="chat_box_container h-[350px] p-8 flex items-center justify-center ">
          
          <div className="chat_box bg-slate-200 rounded overflow-hidden">

            {/*   Message box head and opponent name content */}
            <div className="opponent_chat_head flex gap-2 font-semibold items-center w-full bg-white p-2">
              <span className="px-3 py-2 rounded-full bg-red-800">
                {user.opponent.username[0].toUpperCase()}
              </span>{" "}
              <p className="text-2xl text-black">
                {user.opponent.username.toUpperCase()}
              </p>
            </div>
               {/* Message box head ends here */}

            {/*   Chats are here */}
            <div className="chats_container overflow-auto">
              {
               allChats?.map((ele, i) => (
                <div
                  className={
                    `chat ` +
                    (ele.sender == user._id ?  "current_user_chat" : "opponet_user_chat")
                  }
                  key={i}
                >
                  <span>{ele.message}</span>
                </div>
              ))}
            </div>
            {/*   Chats ends here */}

            {/*   send message input box and send button */}
            <div className="input_chat">
              <form
                onSubmit={addMessage}
                id="input_form"
                className="w-full flex items-center"
              >
                <input
                  type="text"
                  name="message"
                  id="message"
                  placeholder="Type your message"
                  className=" w-full text-gray-900 p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 rounded-t-sm"
                />
                <input
                  type="submit"
                  name="submit"
                  id="send_message"
                  className="px-4 py-2 focus-visible:outline cursor-pointer hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-indigo-600 text-white"
                  value="Send"
                />
              </form>
            </div>
               {/* send message box ends */}

          </div>
        </div>
        {/*   Sidebar chat section ends here */}

      </div>
      {/*   Side bar end */}

      {/*   Main Board area */}
      <div className="main">
        <div className={`game_bord ${user.color}_turn`}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div className="row" key={i}>
              {Array.from({ length: 8 }).map((_, j) => (
                <div
                  className="col"
                  key={j}
                  onClick={() => action(i, j)}
                  id={`${i}_${j}`}
                >
                  <span title={board[i][j]?.name}>
                    <img
                      src={board[i][j]?.icon}
                      alt={board[i][j]?.name}
                      className={` ${user.color}_turn`}
                    />
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Game;
