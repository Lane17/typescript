// class Greeter {
//     greeting: string;
//     constructor(message: string) {
//         this.greeting = message;
//     }
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
//     greet() {
//         return "Hello, " + this.greeting;
//     }
// }
// let greeter = new Greeter("world");
//////////////////////////////////////////////
// class Animal {
//     move(distanceInMeters: number = 0) {
//         console.log(`Animal moved ${distanceInMeters}m.`);
//     }
// }
// class Dog extends Animal {
//     bark() {
//         console.log('Woof! Woof!');
//     }
// }
// const dog = new Dog();
// dog.bark();
// dog.move(10);
// dog.bark();
//////////////////////////////////////////////
// class Animal {
//     name: string;
//     constructor(theName: string) { this.name = theName; }
//     move(distanceInMeters: number = 0) {
//         console.log(`${this.name} moved ${distanceInMeters}m.`);
//     }
// }
// class Snake extends Animal {
//     constructor(name: string) { super(name); }
//     move(distanceInMeters = 5) {
//         console.log("Slithering...");
//         super.move(distanceInMeters);
//     }
// }
// class Horse extends Animal {
//     constructor(name: string) { super(name); }
//     move(distanceInMeters = 45) {
//         console.log("Galloping...");
//         super.move(distanceInMeters);
//     }
// }
// let sam = new Snake("Sammy the Python");
// //tom은 Animal로 선언되었지만 Horse의 값을 가지므로 tom.move(34)는 Horse의 오버라이딩 메서드를 호출합니다.
// let tom: Animal = new Horse("Tommy the Palomino");
// sam.move();
// tom.move(34);
//////////////////////////////////////////////
//(Public, private, and protected modifiers)
//TypeScript에서는 기본적으로 각 멤버는 public입니다.
//////////////////////////////////////////////
//ECMAScript 비공개 필드(ECMAScript Private Fields)
// class Animal {
//     #name: string;
//     constructor(theName: string) { this.#name = theName; }
// }
//new Animal("Cat").#name; 
// 프로퍼티 '#name'은 비공개 식별자이기 때문에 'Animal' 클래스 외부에선 접근할 수 없습니다.
// private과 무슨 차이지?
//////////////////////////////////////////////
//Understanding TypeScript’s private
// class Animal {
//     private name: string;
//     constructor(theName: string) { this.name = theName; }
// }
// new Animal("Cat").name; // 오류: 'name'은 비공개로 선언되어 있습니다;
// class Animal {
//     private name: string;
//     constructor(theName: string) { this.name = theName; }
// }
// class Rhino extends Animal {
//     constructor() { super("Rhino"); }
// }
// class Employee {
//     private name: string;
//     constructor(theName: string) { this.name = theName; }
// }
// let animal = new Animal("Goat");
// let rhino = new Rhino();
// let employee = new Employee("Bob");
// animal = rhino;
// animal = employee; // 오류: 'Animal'과 'Employee'은 호환될 수 없음.
//////////////////////////////////////////////
//Understanding protected
// class Person {
//     protected name: string;
//     constructor(name: string) { this.name = name; }
// }
// class Employee extends Person {
//     private department: string;
//     constructor(name: string, department: string) {
//         super(name);
//         this.department = department;
//     }
//     public getElevatorPitch() {
//         return `Hello, my name is ${this.name} and I work in ${this.department}.`;
//     }
// }
// let howard = new Employee("Howard", "Sales");
// console.log(howard.getElevatorPitch());
// // console.log(howard.name); // 오류
//////////////////////////////////////////////
//생성자 또한 protected로 표시될 수도 있습니다. 이는 클래스를 포함하는 클래스 외부에서 인스턴스화 할 수 없지만 확장 할 수 있음을 의미합니다. 예를 들면,
var Person = /** @class */ (function () {
    function Person(theName) {
        this.name = theName;
    }
    return Person;
}());
// Employee는 Person을 확장할 수 있습니다.
var Employee = /** @class */ (function (_super) {
    __extends(Employee, _super);
    function Employee(name, department) {
        var _this = _super.call(this, name) || this;
        _this.department = department;
        return _this;
    }
    Employee.prototype.getElevatorPitch = function () {
        return "Hello, my name is " + this.name + " and I work in " + this.department + ".";
    };
    return Employee;
}(Person));
var howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
// let john = new Person("John"); // 오류: 'Person'의 생성자는 protected 입니다.
