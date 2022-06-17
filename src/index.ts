import path from "path";
import express from "express";
import api from "./routes/api";

const app = express();
const views = path.resolve(__dirname, "../public");

//@ts-ignore
app.use("/api", api);

app.get("/", (req, res) => {
  res.sendFile(path.resolve(views, "index.html"));
});

app.get("/map", (req, res) => {
  res.sendFile(path.resolve(views, "./map/map.html"));
});

app.get("/logs", (req, res) => {
  res.sendFile(path.resolve(views, "./logs/index.html"));
});

if (!module.parent) {
  app.listen(8080);
}
export default app;