import React, { useState } from "react";
const Game = () => {
  // const board = [
  //   ["Rock", "Bishop", "Knight", "Queen", "King", "Knight", "Bishop", "Rock"],
  //   ["Pawn", "Pawn", "Pawn", "Pawn", "Pawn", "Pawn", "Pawn", "Pawn"],
  //   ['','','','','','','',''],
  //   ['','','','','','','',''],
  //   ['','','','','','','',''],
  //   ['','','','','','','',''],
  //   ["Pawn", "Pawn", "Pawn", "Pawn", "Pawn", "Pawn", "Pawn", "Pawn"],
  //   ["Rock", "Bishop", "Knight", "King", "Queen", "Knight", "Bishop", "Rock"],
  // ];

  const [selectedPiece, setSelectedPiece] = useState({ i: null, j: null });
  const [currentTurn, setCurrentTurn] = useState("white");

  const [validPathArray, setValidPathArray] = useState([]);
  const default_board = [
    [
      { name: "Rook", color: "black", background: "", icon: "Rook" },
      { name: "Bishop", color: "black", background: "", icon: "Bishop" },
      { name: "Knight", color: "black", background: "", icon: "Knight" },
      { name: "Queen", color: "black", background: "", icon: "Queen" },
      { name: "King", color: "black", background: "", icon: "King" },
      { name: "Knight", color: "black", background: "", icon: "Knight" },
      { name: "Bishop", color: "black", background: "", icon: "Bishop" },
      { name: "Rook", color: "black", background: "", icon: "Rook" },
    ],
    Array(8).fill({
      name: "Pawn",
      color: "black",
      background: "",
      icon: "Pawn",
    }),
    Array(8).fill({ name: "", color: "", background: "", icon: "" }), // Empty rows
    Array(8).fill({ name: "", color: "", background: "", icon: "" }),
    Array(8).fill({ name: "", color: "", background: "", icon: "" }),
    Array(8).fill({ name: "", color: "", background: "", icon: "" }),
    Array(8).fill({
      name: "Pawn",
      color: "white",
      background: "",
      icon: "Pawn",
    }),
    [
      { name: "Rook", color: "white", background: "", icon: "Rook" },
      { name: "Bishop", color: "white", background: "", icon: "Bishop" },
      { name: "Knight", color: "white", background: "", icon: "Knight" },
      { name: "King", color: "white", background: "", icon: "King" },
      { name: "Queen", color: "white", background: "", icon: "Queen" },
      { name: "Knight", color: "white", background: "", icon: "Knight" },
      { name: "Bishop", color: "white", background: "", icon: "Bishop" },
      { name: "Rook", color: "white", background: "", icon: "Rook" },
    ],
  ];
  const [board, setBoard] = useState(default_board);

  const clearPathMarks = () => {
    console.log("clearing path");
    setValidPathArray([]);
    const all_path_ele = document.getElementsByClassName("path_ele");
    Array.from(all_path_ele).forEach((ele) => {
      ele.style.backgroundColor = "";
      ele.classList.remove("path_ele");
    });
  };
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

  // showing path for rook &
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

  const showRookPath = (i, j) => {
    console.log("showing Rook Path");

    showUpperPath(i - 1, j, i, j);
    showLowerPath(i + 1, j, i, j);
    showLeftPath(i, j - 1, i, j);
    showRightPath(i, j + 1, i, j);
  };

  const showKnightPath = (i, j) => {
    console.log("showing Knight Path");
    digonallyRightUp(i - 1, j + 1, i, j);
    digonallyRightDown(i + 1, j + 1, i, j);
    digonallyLeftDown(i + 1, j - 1, i, j);
    digonallyLeftUp(i - 1, j - 1, i, j);
  };

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

  const showBishopPath = (i, j) => {
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
      case "Knight":
        showKnightPath(i, j);
        break;
      case "Queen":
        showQueenPath(i, j);
        break;
      case "Bishop":
        showBishopPath(i, j);
        break;
      case "King":
        showKingPath(i, j);
        break;
    }
  };

  const resetBoard = () =>{
    setBoard(default_board);
  }

  const action = (i, j) => {
    const prev_i = selectedPiece.i,
      prev_j = selectedPiece.j;
    console.log(currentTurn);
    let current_board = board;

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
        if(board[i][j].name === 'King'){
          console.log(board[i][j].color, "king dead... Game over");
          let message = 
          alert("Game Over!! "+ board[prev_i][prev_j].color + ", Won the Game!!" );
          resetBoard();
          setCurrentTurn('white');
        }else{
          board[i][j] = board[prev_i][prev_j];
          board[prev_i][prev_j] = {
            name: "",
            color: "",
            background: "",
            icon: "",
          };
          const next_turn = currentTurn === "white" ? "black" : "white";
          setCurrentTurn(next_turn);
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
        setCurrentTurn(next_turn);
        setSelectedPiece((prev) => ({ ...prev, i: null, j: null }));
        return;
      }
    } else {
      if (board[i][j].name === "") {
        return;
      }

      if(currentTurn !== board[i][j].color){
        console.log("It's ", currentTurn, "turn");
        return;
      }

      console.log("setting i,j", i, j);
      setSelectedPiece({ i, j });
      document.getElementById(`${i}_${j}`).classList.add("selected");
      showPath(i, j);
    }

  };

  return (
    <div className="game_container">
    <div style={{color: "white"}}>
      current Turn : {currentTurn}
    </div>
      <div className="game_bord">
        {Array.from({ length: 8 }).map((_, i) => (
          <div className="row" key={i}>
            {Array.from({ length: 8 }).map((_, j) => (
              <div
                className="col"
                key={j}
                onClick={() => action(i, j)}
                id={`${i}_${j}`}
              >
                <span style={{ color: board[i][j]?.color }}>
                  {board[i][j]?.name}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;
