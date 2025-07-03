import express from "express";
const app = express;

const count=0;
const PORT = 3000;
function increment() {
    count = count+1
    console.log=(count);
};

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
