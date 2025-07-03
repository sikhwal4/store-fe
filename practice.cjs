// const express = require('express');
// const cheerio = require("cheerio");
// const axios  = require("axios");
   
// const app = express();
// const students=[
//     {id:1,name:"JAYANT"},
//     {id:2,name:"RJAU"},
//     {id:3,name:"AJAY"}
// ];


// app.get("/students/",(req,res)=>{
//     res.json(students);
// });



// app.get("/students/:id",(req,res)=>{
//     const student = students.find(s => s.id === parseInt(req.params.id));
//     res.json(student);
// });



// app.delete("/students/:id",(req,res) => {
//     console.log(req.params)
//     console.log(req.query)
//     res.json({param:req.params,query:req.query})
// }
// );

// app.listen(3000,()=> console.log("server is runing on https://localhost:3000"));

const express = require("express");
import gplay from "google-play-scraper";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/appdetail",async (req, res) => {
  const  id = req.query.id;

  if (!id) {
    return res.status(400).json({ error: "Keyword is required" });
  }

  try {
    // Use dynamic import
    const detail = await gplay.detail({appid:id});

    res.json({
      message: "data found",
      data: detail
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong", details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
