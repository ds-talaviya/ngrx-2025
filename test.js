let a = {
    b: {
        c: 'abc'
    },
    d: 'd'
}

let e = structuredClone(a); // better than JSON.parse(JSON.stringify(a))

e.b.c = "ed"
console.log(a)
console.log(e)