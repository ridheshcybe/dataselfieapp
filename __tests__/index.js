test('if api exports router', ()=>{
    expect(require("../dist/routes/api").default.toString()).toStrictEqual(require("express").Router().toString())
})

test('if index exports express', ()=>{
    expect(require("../dist/index").default.toString()).toStrictEqual(require("express")().toString())
})