import React, { useRef, useState } from "react";

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
  const [selectedPosition, setSelectedPosition] = useState({
    i: null,
    j: null,
  });

  const [validPathArray, setValidPathArray]= useState([]);

  const [board, setBoard] = useState([
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
  ]);

  const clearPathMarks = ()=>{
    console.log('clearing path');
    setValidPathArray([]);
    const all_path_ele = document.getElementsByClassName('path_ele');
    Array.from(all_path_ele).forEach((ele) => {
      ele.style.backgroundColor = '';
      ele.classList.remove("path_ele");
    });
  }
  const showRookPath = (i, j) => {
    //clearing previous path
    clearPathMarks();
    console.log('showing rock path');
    const next_index = (a, b) => {
      if (board[i][j].color === "white") {
        return a - b;
      } else {
        return a + b;
      }
    };
    let tempPathArray=[];
    if (i == 1 || i == 6) {
      //on start possition
      for (let k = 1; k <= 2; k++) {
        const index = next_index(i, k);
        const path_ele = document.getElementById(`${index}_${j}`);
        if (path_ele) {
          path_ele.classList.add("path_ele");
          
        }
        if (index >= board.length || index < 0) {
          break;
        }
        tempPathArray.push({i:index, j});
        if (board[index][j].name !== "") {
          path_ele.style.backgroundColor = "red";
          break;
        } else {
          path_ele.style.backgroundColor = "green";
        }
      }
    } else {
      for (let k = 1; k <= 1; k++) {
        const index = next_index(i, k);
        const path_ele = document.getElementById(`${index}_${j}`);
        if (path_ele) {
          path_ele.classList.add("path_ele");
          
        }
        if (index >= board.length || index < 0) {
          break;
        }
        tempPathArray.push({i:index, j});
        if (board[index][j].name !== "") {
          path_ele.style.backgroundColor = "red";
          break;
        } else {
          path_ele.style.backgroundColor = "green";
        }
      }
    }
    console.log(tempPathArray);
    setValidPathArray(tempPathArray);
  };
  const showPath = (i, j) => {
    const peice = board[i][j];

    switch (peice.name) {
      case "Pawn":
        showRookPath(i, j);
        break;
    }
  };
  const isCorrectPath =(i, j)=>{
    if(validPathArray.some(path => path.i === i && path.j === j)){
      console.log('valid path');
      return true;
    }
    console.log('not valid path');
    return false;
  }
  const action = (i, j) => {

    const prev_i = selectedPiece.i, prev_j = selectedPiece.j;
    if(prev_i !==null && prev_j !== null){

      if(!isCorrectPath(i, j) && board[i][j].color !== board[prev_i][prev_j].color){ //checking the valid paths
        console.log('not valid path');
        setSelectedPiece((prev) => ({ ...prev, i: null, j: null }));
        clearPathMarks();
        return;
      }else if(board[i][j].color === board[prev_i][prev_j].color){ // if both form the same color
        setSelectedPiece((prev) => ({ ...prev, i: null, j: null }));
        clearPathMarks();
        console.log('same color');
        console.log('setting i,j');
        setSelectedPiece({i,j});
        showPath(i,j);
        return;
      }else if(board[i][j].name != '' && board[i][j].color !== board[prev_i][prev_j].color){ // if both of opposit color
        board[i][j] = board[prev_i][prev_j];
        board[prev_i][prev_j]={ name: "", color: "", background: "", icon: "" };
        clearPathMarks();
        console.log('opposit color kill other');
        setSelectedPiece((prev) => ({ ...prev, i: null, j: null }));
        return;
      }else{ // path is empty;
        let tempBoard= board[i][j];
        board[i][j] = board[prev_i][prev_j];
        board[prev_i][prev_j]=tempBoard;
        console.log('forward moving');
        clearPathMarks();
        setSelectedPiece((prev) => ({ ...prev, i: null, j: null }));
        return;
      }
      
    }else{
      console.log('setting i,j');
      setSelectedPiece({i,j});
      showPath(i,j);
    }
  };

  return (
    <div className="game_container">
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
