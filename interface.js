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
// let mySquare = createSquare({ color: "black" });
// let mySquare2 = createSquare({ color: "red", width: 100 });
// let mySquare3 = createSquare({ color: "red", area: 100 }); //error!
// let mySquare4 = createSquare({ color: "red", a: 100 }); //error!
// console.log(mySquare);
// console.log(mySquare2);
// console.log(mySquare3);
// console.log(mySquare4);
var mySquare5 = createSquare({ width: 100, opacity: 0.5 });
// console.log("mySquare5========");
// console.log(mySquare5);
var squareOptions = { colour: "red", width: 100 };
var mySquare6 = createSquare(squareOptions);
var mySearch;
mySearch = function (src, sub) {
    var result = src.search(sub);
    return result > -1;
};
console.log(mySearch("Hi, there", "there"));
var myArray;
myArray = ["Bob", "Fred"];
var myStr = myArray[0];
console.log(myStr);
var myArray2;
myArray2 = ["Bob"]["Cat"];
var myStr2 = myArray2["0"];
console.log(myStr2);
