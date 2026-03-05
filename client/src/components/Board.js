function Board({ board, handleClick, selected, validTargets }) {

  return (

    <div className="board">

      {board.map((row,r)=>
        row.map((cell,c)=>{

          if(cell===null){
            return <div key={r+"-"+c}></div>
          }

          const isTarget = validTargets?.some(
            t => t.r === r && t.c === c
          )

          return(

            <div
              key={r+"-"+c}
              className={`hole
                ${selected && selected.r===r && selected.c===c ? "selected" : ""}
                ${isTarget ? "valid" : ""}
              `}
              onClick={()=>handleClick(r,c)}
            >

              {cell === 1 && (
                <div
                  className={`marble ${
                    selected && selected.r === r && selected.c === c
                      ? "marble-selected"
                      : ""
                  }`}
                ></div>
              )}

            </div>

          )

        })
      )}

    </div>

  )

}

export default Board