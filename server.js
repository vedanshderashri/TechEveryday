const express = require("express");
const path = require("path");

const app = express();

app.use("/notes", express.static(path.join(__dirname, "notes")));
app.use(express.static(path.join(__dirname, "public")));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Dev Journal running at http://localhost:${PORT}`);
});