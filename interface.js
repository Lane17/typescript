var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
// myArray2 = ["Bob"]["Cat"];
// let myStr2: string = myArray2["0"];
// console.log(myStr2);
//???????? string index를 사용하고 싶으면 어떻게 해야함?
var Animal = /** @class */ (function () {
    function Animal() {
    }
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Dog;
}(Animal));
var DigitalClock = /** @class */ (function () {
    function DigitalClock() {
    }
    //인스턴스 매서드를 정의 
    // constructor(h: number, m: number){}
    DigitalClock.prototype["new"] = function (h, m) { };
    DigitalClock.prototype.tick = function () {
        console.log("beep beep");
    };
    return DigitalClock;
}());
var AnalogClock = /** @class */ (function () {
    function AnalogClock(h, m) {
    }
    AnalogClock.prototype.tick = function () {
        console.log("tick tock");
    };
    return AnalogClock;
}());
//ClockInterface를 반환하는 ctor를 parameter로 받는다.
function createClock(ctor, hour, minute) {
    return new ctor(hour, minute);
}
var digital = createClock(DigitalClock, 12, 17);
var analog = createClock(AnalogClock, 7, 32);
//반환값은 ClockInterface 이므로, 이 interface의 tick() 호출 
digital.tick();
analog.tick();
var square = {};
square.color = "blue";
square.sideLength = 10;
console.log(square);
var square2 = {};
square2.color = "blue";
square2.sideLength = 10;
square2.penWidth = 5.0;
console.log(square2);
function getCounter() {
    var counter = (function (start) { });
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}
var ccc = getCounter();
ccc(10);
ccc.interval = 5.0;
ccc.reset();
//Interfaces Extending Classes
//인터페이스 타입이 클래스 타입을 확장하면, 클래스의 멤버는 상속받지만 구현은 상속받지 않습니다.
//인터페이스는 심지어 기초 클래스의 private과 protected 멤버도 상속받습니다. 이것은 인터페이스가 private 혹은 protected 멤버를 포함한 클래스를 확장할 수 있다는 뜻이고, 인터페이스 타입은 그 클래스나 하위클래스에 의해서만 구현될 수 있습니다.
var Control = /** @class */ (function () {
    function Control() {
    }
    return Control;
}());
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Button.prototype.select = function () { };
    return Button;
}(Control));
var TextBox = /** @class */ (function (_super) {
    __extends(TextBox, _super);
    function TextBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TextBox;
}(Control));
// Error: Property 'state' is missing in type 'Image'.
// class Image implements SelectableControl {
//     private state: any;
//     select() { }
// }
// -> state는 private 멤버이기 때문에, SelectableControl를 구현하는 것은 Control의 자식에게만 가능
// Control 클래스 안에서 SelectableControl의 인스턴스를 통해서 state private member에 접근 가능
// class Location {
// }
