import moveSound from "../assets/move.mp3"
import winSound from "../assets/win.mp3"
import loseSound from "../assets/lose.mp3"
import { useState } from "react"
import Board from "../components/Board"
import { createClassicBoard } from "../engine/createBoard"
import { isValidMove, makeMove } from "../engine/moveLogic"

import "../styles/game.css"

function Game(){
const moveAudio = new Audio(moveSound)
const winAudio = new Audio(winSound)
const loseAudio = new Audio(loseSound)
const [board,setBoard] = useState(createClassicBoard())
const [selected,setSelected] = useState(null)
const [moves,setMoves] = useState(0)
const [validTargets,setValidTargets] = useState([])
const [history,setHistory] = useState([])

function checkWin(board){

let count = 0

for(let row of board){
for(let cell of row){

if(cell === 1){
count++
}

}
}

return count === 1

}

function hasValidMove(board){

for(let r=0;r<7;r++){
for(let c=0;c<7;c++){

if(board[r][c]===1){

if(c+2<7 && board[r][c+1]===1 && board[r][c+2]===0){
return true
}

if(c-2>=0 && board[r][c-1]===1 && board[r][c-2]===0){
return true
}

if(r+2<7 && board[r+1][c]===1 && board[r+2][c]===0){
return true
}

if(r-2>=0 && board[r-1][c]===1 && board[r-2][c]===0){
return true
}

}

}
}

return false

}

function getValidTargets(board,sr,sc){

const targets=[]

const directions=[
[0,2],
[0,-2],
[2,0],
[-2,0]
]

for(const [dr,dc] of directions){

const tr=sr+dr
const tc=sc+dc
const mr=sr+dr/2
const mc=sc+dc/2

if(
tr>=0 && tr<7 &&
tc>=0 && tc<7 &&
board[mr]?.[mc]===1 &&
board[tr]?.[tc]===0
){
targets.push({r:tr,c:tc})
}

}

return targets

}

const handleClick=(r,c)=>{

if(board[r][c]===1){

setSelected({r,c})

const targets=getValidTargets(board,r,c)

setValidTargets(targets)

return

}

if(board[r][c]===0 && selected){

const sr=selected.r
const sc=selected.c

if(isValidMove(board,sr,sc,r,c)){

setHistory([...history, board])

const newBoard=makeMove(board,sr,sc,r,c)

setBoard(newBoard)
setMoves(moves+1)
moveAudio.play()
setValidTargets([])

if(checkWin(newBoard)){
winAudio.play()
alert("🎉 You Win!")
}
else if(!hasValidMove(newBoard)){

loseAudio.play()

alert("❌ No valid moves left")

}

}

setSelected(null)

}

}

function undoMove(){

if(history.length === 0) return

const previousBoard = history[history.length - 1]

setBoard(previousBoard)

setHistory(history.slice(0,-1))

setMoves(moves - 1)

setSelected(null)

setValidTargets([])

}

function restartGame(){

setBoard(createClassicBoard())
setMoves(0)
setSelected(null)
setValidTargets([])
setHistory([])

}

return(

<div className="game-container">

<h1 className="game-title">Peg Solitaire</h1>

<div className="stats">
Moves: {moves}
</div>

<Board
board={board}
handleClick={handleClick}
selected={selected}
validTargets={validTargets}
/>

<br/>

<button
className="button"
onClick={undoMove}
>
Undo Move
</button>

<br/><br/>

<button
className="button"
onClick={restartGame}
>
Restart Game
</button>

</div>

)

}

export default Game