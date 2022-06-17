import * as model from "../model";
import { randomBytes } from "crypto";
import { Router, json } from "express";

const router = Router();
const pass = randomBytes(10).toString("ascii");

router.use(json() as (req, res, next) => void);

router.get("/status", (req, res) => {
  res.send({
    uptime: process.uptime(),
    message: "Ok",
    date: new Date().getTime() / 1000,
  });
});

router.get("/lines", async (req, res) => {
  try {
    const data = await model.findall();
    res.send(data.length + 1);
  } catch (err) {
    res.status(500).send(err.message || err);
  }
});

router.get("/count", async (req, res) => {
  try {
    if (!req.query.id) return res.status(404).send("no id found");
    const data = await model.count(req.query.id);
    res.end(data);
  } catch (e) {
    res.status(400).end(e);
  }
});

router.post("/", async (req, res) => {
  const newData: model.data = Object.assign(
    {
      created: new Date().getTime(),
    },
    req.body
  );

  if (!newData.image) return res.send("no Image found");
  if (!newData.location) return res.send("no Location found");
  if (!newData.location.lat) return res.send("no Lat found");
  if (!newData.location.lon) return res.send("no Lon found");

  try {
    const docs = await model.insert(newData);
    res.send(docs);
  } catch (error) {
    res.status(400).send(error.message || error);
  }
});

router.delete("/", async (req, res) => {
  if (!req.params.id) return res.status(400).send("no id provided");
  const auth = req.header("auth");
  if (!auth) return res.sendStatus(401);
  if (auth !== pass) return res.sendStatus(401);

  try {
    const removed = await model.remove(req.params.id);
    res.send(`removed ${removed} items`);
  } catch (err) {
    res.status(500).send(err.message || err);
  }
});

router.get("/", async (req, res) => {
  try {
    const found = await model.findall();
    res.send(found);
  } catch (error) {
    res.status(500).send(error.message || error);
  }
});

export default router;
