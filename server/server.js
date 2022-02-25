import express from "express";

const app = express();

app.get("/api/login", (req, res) => {
  res.json({ username: "admin", fullName: "Tøffetøffe Tøffetøff" });
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Non-client server running at http://localhost:${server.address().port}`
  );
});
