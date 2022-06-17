const fs = require("fs");
const path = require("path");

const dbpath = path.resolve(__dirname, "../db/db.db")
fs.rmSync(dbpath);

const model = require("../dist/model.js");
const insert = {
    image: "hi",
    location: {
        lat: 0.0,
        lon: 0.0,
    },
    created: new Date().getTime(),
};

describe("insert and remove a doc", () => {
    let id;
    test('insert doc', async () => {
        const got = await model.insert(insert);
        expect(got["_id"]).toBeDefined();
        expect(got.image).toBe(insert.image);
        expect(got.location.lat).toBe(insert.location.lat);
        expect(got.location.lon).toBe(insert.location.lon);

        id = got["_id"];
    });

    test("remove doc", async () => {
        const num = await model.remove(id)
        expect(num).toBe(1);
    });
});

describe("insert and deleteall", () => {
    test('insert doc', async () => {
        const got = await model.insert(insert);
        expect(got["_id"]).toBeDefined();
        expect(got.image).toBe(insert.image);
        expect(got.location.lat).toBe(insert.location.lat);
        expect(got.location.lon).toBe(insert.location.lon);
    });

    test('delete all', async () => {
        const nums = await model.removeall();
        expect(nums).toBe(1);
    })
})

describe("insert, count and deleteall", () => {
    let id;
    test('insert doc', async () => {
        const got = await model.insert(insert);
        expect(got["_id"]).toBeDefined();
        expect(got.image).toBe(insert.image);
        expect(got.location.lat).toBe(insert.location.lat);
        expect(got.location.lon).toBe(insert.location.lon);

        id = got["_id"]
    });

    test('count', async () => {
        const nums = await model.count(id);
        expect(nums).toBe(1);
    })

    test('delete all', async () => {
        const nums = await model.removeall();
        expect(nums).toBe(1);
    })
})

describe("insert, findall and remove a doc", () => {
    let id;
    test('insert doc', async () => {
        const got = await model.insert(insert);
        expect(got["_id"]).toBeDefined();
        expect(got.image).toBe(insert.image);
        expect(got.location.lat).toBe(insert.location.lat);
        expect(got.location.lon).toBe(insert.location.lon);

        id = got["_id"];
    });

    test("findall", async () => {
        const num = await model.findall()
        expect(num.length).toBe(1);
        expect(num).toStrictEqual([{ ...insert, "_id": id }])
    });

    test("remove doc", async () => {
        const num = await model.remove(id)
        expect(num).toBe(1);
    });
});