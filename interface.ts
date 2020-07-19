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

// let mySquare = createSquare({ color: "black" });
// let mySquare2 = createSquare({ color: "red", width: 100 });
// let mySquare3 = createSquare({ color: "red", area: 100 }); //error!
// let mySquare4 = createSquare({ color: "red", a: 100 }); //error!

// console.log(mySquare);
// console.log(mySquare2);
// console.log(mySquare3);
// console.log(mySquare4);

let mySquare5 = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
// console.log("mySquare5========");
// console.log(mySquare5);

let squareOptions = { colour: "red", width: 100};
let mySquare6 = createSquare(squareOptions);

// console.log("mySquare6=======");
// console.log(mySquare6);

// let squareOptions2 = { colour: "red"};
// let mySquare7 = createSquare(squareOptions2); //error!

interface SearchFunc {
    (source: string, subString: string): boolean;
    //매개변수 목록, 반환타입 
}

let mySearch: SearchFunc;
mySearch = function(src: string, sub: string) {
    let result = src.search(sub);
    return result > -1;
}

console.log(mySearch("Hi, there", "there"));

//indexable Types
interface StringArray {
    //index signature - only number or string
    [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];
console.log(myStr);

//????????
interface StringArray2 {
    //index signature
    [index: string]: string;
}

let myArray2: StringArray2;
// myArray2 = ["Bob"]["Cat"];
// let myStr2: string = myArray2["0"];
// console.log(myStr2);

//???????? string index를 사용하고 싶으면 어떻게 해야함?

class Animal {
    name: string;
}
class Dog extends Animal {
    breed: string;
}

//???? 이해 못했음
// 오류: 숫자형 문자열로 인덱싱을 하면 완전히 다른 타입의 Animal을 얻게 될 것입니다!
interface NotOkay {
    // [x: number]: Animal;
    [x: string]: Animal;
    // [x: string]: Dog;
}

//implementing an interface
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date): void;
}

class Clock implements ClockInterface {
    currentTime: Date = new Date();
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number){}
}

//Difference between the static and instance sides of classes
interface ClockConstructor {
    new (hour: number, minute: number);
}

class Clock implements ClockConstructor {
    currentTime: Date;
    constructor(h: number, m: number) {}
}