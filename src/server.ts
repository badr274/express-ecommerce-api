import express from "express";
const app = express();
const PORT = 5000;

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ==> http://localhost:${PORT}`);
});
