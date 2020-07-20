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

let squareOptions = { colour: "red", width: 100 };
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
mySearch = function (src: string, sub: string) {
  let result = src.search(sub);
  return result > -1;
};

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
// interface ClockInterface {
//   currentTime: Date;
//   setTime(d: Date): void;
// }

// class Clock implements ClockInterface {
//   currentTime: Date = new Date();
//   setTime(d: Date) {
//     this.currentTime = d;
//   }
//   constructor(h: number, m: number) {}
// }

//Difference between the static and instance sides of classes
// class는 static type, instance type을 갖는다.
// error -> Clock2는 ClockConstructor의 new가 없음
// 클래스의 인스턴스를 검사하는데, 생성자가 static 이라서 이 검사에는 포함되지 않는다.
// new, constructor는 는 자동으로 static? 
// interface ClockConstructor {
//   new (hour: number, minute: number);
// }

// class Clock2 implements ClockConstructor {
//   currentTime: Date;
//   constructor(h: number, m: number) {}
// }

//생성자는 new 이건 constructor이건 관계가 없는 모양?

interface ClockConstructor {
    //생성자만 정의
  new (hour: number, minute: number): ClockInterface;
}

interface ClockInterface {
    tick(): void;
}

class DigitalClock implements ClockInterface {
    //인스턴스 매서드를 정의 
    // constructor(h: number, m: number){}
    new (h: number, m: number){}
    tick() {
        console.log("beep beep");
    }
}

class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("tick tock");
    }
}

//ClockInterface를 반환하는 ctor를 parameter로 받는다.
function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);

//반환값은 ClockInterface 이므로, 이 interface의 tick() 호출 
digital.tick();
analog.tick();


//Extending Interfaces
interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}

let square = {} as Square;
square.color = "blue";
square.sideLength = 10;

console.log(square);

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square2 = {} as Square;
square2.color = "blue";
square2.sideLength = 10;
square2.penWidth = 5.0;

console.log(square2);

//Hybrid Types
//추가적인 프로퍼티와 함께, 함수와 객체 역할 모두 수행
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = (function (start: number) { }) as Counter;
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let ccc = getCounter();
ccc(10);
ccc.interval = 5.0;
ccc.reset();

//Interfaces Extending Classes
//인터페이스 타입이 클래스 타입을 확장하면, 클래스의 멤버는 상속받지만 구현은 상속받지 않습니다.
//인터페이스는 심지어 기초 클래스의 private과 protected 멤버도 상속받습니다. 이것은 인터페이스가 private 혹은 protected 멤버를 포함한 클래스를 확장할 수 있다는 뜻이고, 인터페이스 타입은 그 클래스나 하위클래스에 의해서만 구현될 수 있습니다.

class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select() { }
}

class TextBox extends Control {
    // select() { } //-> 있어도 없어도..
}

// Error: Property 'state' is missing in type 'Image'.
// class Image implements SelectableControl {
//     private state: any;
//     select() { }
// }
// -> state는 private 멤버이기 때문에, SelectableControl를 구현하는 것은 Control의 자식에게만 가능
// Control 클래스 안에서 SelectableControl의 인스턴스를 통해서 state private member에 접근 가능


// class Location {

// }


