/// <reference path="Validation.ts" />
var Validation;
(function (Validation) {
    var lettersRegexp = /^[A-Za-z]+$/;
    var LettersOnlyValidator = /** @class */ (function () {
        function LettersOnlyValidator() {
        }
        LettersOnlyValidator.prototype.isAcceptable = function (s) {
            return lettersRegexp.test(s);
        };
        return LettersOnlyValidator;
    }());
    Validation.LettersOnlyValidator = LettersOnlyValidator;
})(Validation || (Validation = {}));
/// <reference path="Validation.ts" />
var Validation;
(function (Validation) {
    var numberRegexp = /^[0-9]+$/;
    var ZipCodeValidator = /** @class */ (function () {
        function ZipCodeValidator() {
        }
        ZipCodeValidator.prototype.isAcceptable = function (s) {
            return s.length === 5 && numberRegexp.test(s);
        };
        return ZipCodeValidator;
    }());
    Validation.ZipCodeValidator = ZipCodeValidator;
})(Validation || (Validation = {}));
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
/// <reference path="Validation.ts" />
/// <reference path="LettersOnlyValidators.ts" />
/// <reference path="ZipCodeValidators.ts" />
// Some samples to try
var strings = ["Hello", "98052", "101"];
// Validators to use
var validators = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();
// Show whether each string passed each validator
for (var _i = 0, strings_1 = strings; _i < strings_1.length; _i++) {
    var s = strings_1[_i];
    for (var name_1 in validators) {
        console.log("\"" + s + "\" - " + (validators[name_1].isAcceptable(s) ? "matches" : "does not match") + " " + name_1);
    }
}
//파일이 여러 개 있으면 컴파일된 코드가 모두 로드되는지 확인해야 합니다. 이를 수행하는 두 가지 방법이 있습니다.
//먼저, 모든 입력 파일을 하나의 JavaScript 출력 파일로 컴파일하기 위해 --outFile 플래그를 사용하여 연결 출력(concatenated output)을 사용할 수 있습니다:
//tsc --outFile namespace.js namespace.ts
//tsc --outFile sample.js Validation.ts LettersOnlyValidator.ts ZipCodeValidator.ts Test.ts
