import express from "express";
import * as path from "path";

const app = express();

app.get("/api/login", (req, res) => {
  res.json({ username: "admin", fullName: "Tøffetøffe Tøffetøff" });
});

app.use(express.static("../client/dist"));
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api/")) {
    return res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Non-client server running at http://localhost:${server.address().port}`
  );
});
