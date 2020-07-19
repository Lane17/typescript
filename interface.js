function createSquare(config) {
    var newSquare = { color: "white", area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
var mySquare = createSquare({ color: "black" });
var mySquare2 = createSquare({ color: "red", width: 100 });
var mySquare3 = createSquare({ color: "red", area: 100 });
var mySquare4 = createSquare({ color: "red", a: 100 });
console.log(mySquare);
console.log(mySquare2);
console.log(mySquare3);
console.log(mySquare4);
