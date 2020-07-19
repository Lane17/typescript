interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = { color: "white", area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({ color: "black" });
let mySquare2 = createSquare({ color: "red", width: 100 });
let mySquare3 = createSquare({ color: "red", area: 100 });
// let mySquare4 = createSquare({ color: "red", a: 100 }); //error!

console.log(mySquare);
console.log(mySquare2);
console.log(mySquare3);
console.log(mySquare4);
