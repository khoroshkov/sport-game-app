import React from "react";

export default function EndedGames({ result }) {
  let gameResult = [];
  if (result) {
    gameResult = result.split(" ");
  }
  return (
    <div className="ended-games-cont">
      {!gameResult.length && <span>TBD</span>}
      {gameResult && gameResult?.map((res) => <p key={res}>{res}</p>)}
    </div>
  );
}
