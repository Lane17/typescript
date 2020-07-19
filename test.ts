class C {
    p = 12;
    m() {
        console.log("This is inside m");
    }
}
let c = new C();
let clone = { ...c };

console.log(clone.p);
c.m();