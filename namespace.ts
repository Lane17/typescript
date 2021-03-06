//////////////////////////////////////////////////////////////////
//단일 파일 검사기 (Validators in a single file)

// interface StringValidator {
//   isAcceptable(s: string): boolean;
// }

// let lettersRegexp = /^[A-Za-z]+$/;
// let numberRegexp = /^[0-9]+$/;

// class LettersOnlyValidator implements StringValidator {
//   isAcceptable(s: string) {
//     return lettersRegexp.test(s);
//   }
// }

// class ZipCodeValidator implements StringValidator {
//   isAcceptable(s: string) {
//     return s.length === 5 && numberRegexp.test(s);
//   }
// }

// // 시도해 볼 샘플
// let strings = ["Hello", "98052", "101"];

// // 사용할 검사기
// let validators: { [s: string]: StringValidator } = {};
// validators["ZIP code"] = new ZipCodeValidator();
// validators["Letters only"] = new LettersOnlyValidator();

// // 각 문자열이 각 검사기를 통과했는지 표시
// for (let s of strings) {
//   for (let name in validators) {
//     let isMatch = validators[name].isAcceptable(s);
//     console.log(`'${s}' ${isMatch ? "matches" : "does not match"} '${name}'.`);
//   }
// }

//////////////////////////////////////////////////////////////////
//이 예에서는 모든 검사기 관련 개체를 Validation이라는 하나의 네임스페이스로 옮기겠습니다.
//여기서 인터페이스 및 클래스가 네임스페이스 외부에서도 접근 가능하도록 선언부에 export를 붙입니다.
//변수 letterRegexp와 numberRegexp는 구현 세부 사항이므로 외부로 내보내지 않아 네임스페이스 외부 코드에서 접근할 수 없습니다.

// namespace Validation {
//     export interface StringValidator {
//         isAcceptable(s: string): boolean;
//     }

//     const lettersRegexp = /^[A-Za-z]+$/;
//     const numberRegexp = /^[0-9]+$/;

//     export class LettersOnlyValidator implements StringValidator {
//         isAcceptable(s: string) {
//             return lettersRegexp.test(s);
//         }
//     }

//     export class ZipCodeValidator implements StringValidator {
//         isAcceptable(s: string) {
//             return s.length === 5 && numberRegexp.test(s);
//         }
//     }
// }

// // 시도해 볼 샘플
// let strings = ["Hello", "98052", "101"];

// // 사용할 검사기
// let validators: { [s: string]: Validation.StringValidator; } = {};
// validators["ZIP code"] = new Validation.ZipCodeValidator();
// validators["Letters only"] = new Validation.LettersOnlyValidator();

// // 각 문자열이 각 검사기를 통과했는지 표시
// for (let s of strings) {
//     for (let name in validators) {
//         console.log(`"${s}" - ${validators[name].isAcceptable(s) ? "matches" : "does not match"} ${name}`);
//     }
// }

//////////////////////////////////////////////////////////////////
//파일 간 분할 (Splitting Across Files)
//다중 파일 네임스페이스 (Multi-file namespaces)

//여기서 Validation 네임스페이스를 여러 파일로 분할합니다. 파일이 분리되어 있어도 같은 네임스페이스에 기여할 수 있고 마치 한 곳에서 정의된 것처럼 사용할 수 있습니다. 파일 간 의존성이 존재하므로, 참조 태그를 추가하여 컴파일러에게 파일 간의 관계를 알립니다. 그 외에 테스트 코드는 변경되지 않았습니다.

// /// <reference path="Validation.ts" />
// /// <reference path="LettersOnlyValidators.ts" />
// /// <reference path="ZipCodeValidators.ts" />

// // Some samples to try
// let strings = ["Hello", "98052", "101"];

// // Validators to use
// let validators: { [s: string]: Validation.StringValidator; } = {};
// validators["ZIP code"] = new Validation.ZipCodeValidator();
// validators["Letters only"] = new Validation.LettersOnlyValidator();

// // Show whether each string passed each validator
// for (let s of strings) {
//     for (let name in validators) {
//         console.log(`"${s}" - ${validators[name].isAcceptable(s) ? "matches" : "does not match"} ${name}`);
//     }
// }

//파일이 여러 개 있으면 컴파일된 코드가 모두 로드되는지 확인해야 합니다. 이를 수행하는 두 가지 방법이 있습니다.
//먼저, 모든 입력 파일을 하나의 JavaScript 출력 파일로 컴파일하기 위해 --outFile 플래그를 사용하여 연결 출력(concatenated output)을 사용할 수 있습니다:
//tsc --outFile namespace.js namespace.ts
//tsc --outFile sample.js Validation.ts LettersOnlyValidator.ts ZipCodeValidator.ts Test.ts
//tsc --outFile namespace.js Validation.ts LettersOnlyValidators.ts ZipCodeValidators.ts namespace.ts

//또는 파일별 컴파일 (기본값)을 사용하여 각 입력 파일을 하나의 JavaScript 파일로 생성할 수 있습니다. 여러 JS 파일이 생성되는 경우, 웹 페이지에서 생성된 개별 파일을 적절한 순서로 로드하기 위해 <script> 태그를 사용해야 합니다. 예를 들어:

//////////////////////////////////////////////////////////////////
//aliases

// namespace Shapes {
//     export namespace Polygons {
//         export class Triangle { }
//         export class Square { }
//     }
// }

// import polygons = Shapes.Polygons;
// let sq = new polygons.Square(); // 'new Shapes.Polygons.Square()'와 동일

//import q = x.y.z
//require 키워드를 사용하지 않는다는 것을 명심하세요; - 모듈 로드 시 사용

//////////////////////////////////////////////////////////////////
//다른 JavaScript 라이브러리로 작업하기 (Working with Other JavaScript Libraries)


//구현을 정의하지 않은 선언을 "ambient"라고 부릅니다. 일반적으로 이것은 .d.ts 파일에 정의되어 있습니다. C/C++에 익숙하다면 이를 .h 파일로 생각할 수 있습니다. 몇 가지 예를 살펴보겠습니다.
//Ambient 네임스페이스 (Ambient Namespaces)
// declare namespace D3 {
//     export interface Selectors {
//         select: {
//             (selector: string): Selection;
//             (element: EventTarget): Selection;
//         };
//     }

//     export interface Event {
//         x: number;
//         y: number;
//     }

//     export interface Base extends Selectors {
//         event: Event;
//     }
// }

// declare var d3: D3.Base;