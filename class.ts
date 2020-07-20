// class Greeter {
//     greeting: string;
//     constructor(message: string) {
//         this.greeting = message;
//     }

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

// class Person {
//     protected name: string;
//     protected constructor(theName: string) { this.name = theName; }
// }

// // Employee는 Person을 확장할 수 있습니다.
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
// // let john = new Person("John"); // 오류: 'Person'의 생성자는 protected 입니다.

//////////////////////////////////////////////
//Readonly modifier

// class Octopus {
//     readonly name: string;
//     readonly numberOfLegs: number = 8;
//     constructor(theName: string) {
//         this.name = theName;
//     }
// }
// let dad = new Octopus("Man with the 8 strong legs");
// // dad.name = "Man with the 3-piece suit"; // 오류! name은 읽기전용 입니다.
// console.log(dad.name);

//////////////////////////////////////////////
//매개변수 프로퍼티 (Parameter properties)

// class Octopus {
//     readonly numberOfLegs: number = 8;
//     constructor(readonly name: string) {
//     }
// }

// let dad = new Octopus("Man with the 8 strong legs");
// console.log(dad.name);

//////////////////////////////////////////////
//접근자(Accessors)

// class Employee1 {
//     fullName: string;
// }

// let employee1 = new Employee1();
// employee1.fullName = "Bob Smith";
// if (employee1.fullName) {
//     console.log(employee1.fullName);
// }

// const fullNameMaxLength = 10;
// class Employee {
//     private _fullName: string;

//     get fullName(): string {
//         return this._fullName;
//     }

//     set fullName(newName: string) {
//         if (newName && newName.length > fullNameMaxLength) {
//             throw new Error("fullName has a max length of " + fullNameMaxLength);
//         }

//         this._fullName = newName;
//     }
// }

// let employee = new Employee();
// employee.fullName = "Bob Smith";
// if (employee.fullName) {
//     console.log(employee.fullName);
// }

//먼저 접근자는 ECMAScript 5 이상을 출력하도록 컴파일러를 설정해야 합니다.
//tsc -t es5 class.ts

//////////////////////////////////////////////
//전역 프로퍼티 (Static Properties)

// class Grid {
//     static origin = { x: 0, y: 0 };
//     calculateDistanceFromOrigin(point: { x: number; y: number; }) {
//         let xDist = (point.x - Grid.origin.x);
//         let yDist = (point.y - Grid.origin.y);
//         return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
//     }
//     constructor(public scale: number) { }
// }

// let grid1 = new Grid(1.0);  // 1x scale
// let grid2 = new Grid(5.0);  // 5x scale

// console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }));
// console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }));

//////////////////////////////////////////////
//추상 클래스 (Abstract Classes)
//추상 클래스는 직접 인스턴스화할 수 없습니다.

// abstract class Animal {
//     abstract makeSound(): void;
//     move(): void {
//         console.log("roaming the earth...");
//     }
// }

// 추상 클래스 내에서 추상으로 표시된 메서드는 구현을 포함하지 않으며 반드시 파생된 클래스에서 구현되어야 합니다. 추상 메서드는 인터페이스 메서드와 비슷한 문법을 공유합니다. 둘 다 메서드 본문을 포함하지 않고 메서드를 정의합니다. 그러나 추상 메서드는 반드시 abstract 키워드를 포함해야 하며, 선택적으로 접근 지정자를 포함할 수 있습니다.

// abstract class Department {

//     constructor(public name: string) {
//     }

//     printName(): void {
//         console.log("Department name: " + this.name);
//     }

//     abstract printMeeting(): void; // 반드시 파생된 클래스에서 구현되어야 합니다.
// }

// class AccountingDepartment extends Department {

//     constructor() {
//         super("Accounting and Auditing"); // 파생된 클래스의 생성자는 반드시 super()를 호출해야 합니다.
//     }

//     printMeeting(): void {
//         console.log("The Accounting Department meets each Monday at 10am.");
//     }

//     generateReports(): void {
//         console.log("Generating accounting reports...");
//     }
// }

// let department: Department; // 추상 타입의 레퍼런스를 생성합니다
// // department = new Department(); // 오류: 추상 클래스는 인스턴스화 할 수 없습니다
// department = new AccountingDepartment(); // 추상이 아닌 하위 클래스를 생성하고 할당합니다
// department.printName();
// department.printMeeting();
// // department.generateReports(); // 오류: 선언된 추상 타입에 메서드가 존재하지 않습니다
// let department2: AccountingDepartment;
// department2 = new AccountingDepartment();
// department2.printName();
// department2.printMeeting;
// department2.generateReports();


////////////////////////////////////////////////////////////////////////////////////////////
// 고급 기법(Advanced Techniques)
// 생성자 함수(Constructor functions)

// class Greeter {
//     greeting: string;
//     constructor(message: string) {
//         this.greeting = message;
//     }
//     greet() {
//         return "Hello, " + this.greeting;
//     }
// }

// let greeter: Greeter;
// greeter = new Greeter("world");
// console.log(greeter.greet()); // "Hello, world""

////////////////////////////////////////////////////////////////////////////////////////////
// class Greeter {
//     static standardGreeting = "Hello, there";
//     greeting: string;
//     greet() {
//         if (this.greeting) {
//             return "Hello, " + this.greeting;
//         }
//         else {
//             return Greeter.standardGreeting;
//         }
//     }
// }

// let greeter1: Greeter;
// greeter1 = new Greeter();
// console.log(greeter1.greet()); // "Hello, there"

// let greeterMaker: typeof Greeter = Greeter;
// greeterMaker.standardGreeting = "Hey there!";

// let greeter2: Greeter = new greeterMaker();
// console.log(greeter2.greet()); // "Hey there!"

////////////////////////////////////////////////////////////////////////////////////////////
//인터페이스로써 클래스 사용하기(Using a class as an interface)
class Point {
    x: number;
    y: number;
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = { x: 1, y: 2, z: 3 };

