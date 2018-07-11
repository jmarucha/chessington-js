import Player from '../../engine/player';
import Bishop from '../../engine/pieces/bishop';
import Knight from '../../engine/pieces/knight';
import Rook from '../../engine/pieces/rook';
import Queen from '../../engine/pieces/queen';

const mapping = {
    "B": Bishop,
    "N": Knight,
    "R": Rook,
    "Q": Queen
};

export default function promoteUI(player, callback) {
    let colorPrefix = player === Player.BLACK ? "b" : "w";
    let pieceLetters = Object.keys(mapping);
    document.getElementById("pawnUI").innerHTML = pieceLetters
        .map(letter => `<button id="promote${letter}"><img src="img/chesspieces/wikipedia/${colorPrefix}${letter}.png"></button>`)
        .join("");
    pieceLetters.forEach(letter => {
        document.getElementById(`promote${letter}`).addEventListener("click", () => {
            document.getElementById("pawnUI").innerHTML = "";
            callback(new mapping[letter]());
        })
    })
};