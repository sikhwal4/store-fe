// function jayant(){
//    let age=11;
//    if (age>18){
//     console.log("adult");
//    }
//    else{
//     console.log("minore");
//    }
//    return age;
// }   

import express from "express";
import gplay from "google-play-scraper";
import cors from "cors";
import appstore from "app-store-scraper";
import axios from "axios";

const app = express();
app.use(cors());
const PORT = 3000;

app.use(express.json());



// # Appstore detail endpoint
app.get("/detail", async (req, res) => {
  const  id  = req.query.id;
  if (!id) {
    return res.status(400).json({ error: "App ID is required" });
  }

  try {
    const appDetails = await appstore.app({ id });  // Make sure you're using "appstore" package
    res.json(appDetails);
  } catch (err) {
    console.error("App Store detail error:", err);
    res.status(500).json({ error: "Failed to fetch App Store details" });
  }
});


// Playstore detail endpoint
app.get("/appdetail", async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: "App ID is required" });

  try {
    const detail = await gplay.app({ appId: id });
    res.json(detail);
  } catch (err) {
    res.status(500).json({ error: "Play Store detail fetch failed", message: err.message });
  }
});
 
// Playstore Search
app.get("/search", async (req, res) => {
  const { query } = req.query;

  if (!query) return res.status(400).json({ error: "Query is required" });

  try {
    const apps = await gplay.search({
      term: query,
      num: 100,
    });
    res.json({ query, results: apps });
  } catch (err) {
    res.status(500).json({ error: "Play Store search failed", details: err.message });
  }
});

/**
 * ✅ App Store Search
 * Expects: /api/appstore/search?query=instagram
 */
app.get("/api/appstore/search", async (req, res) => {
  const { query, lang = "en", country = "us" } = req.query;

  if (!query) return res.status(400).json({ error: "Query is required" });

  try {
    const results = await appstore.search({
      term: query,
      num: 10,
      lang,
      country,
    });

    res.json({ results });
  } catch (err) {
    res.status(500).json({ error: "App Store search failed", details: err.message });
  }
});

/**
 * ✅ App Store Suggestions
 * Expects: /api/appstore/suggestions?query=instagram
 */
app.get("/api/appstore/suggestions", async (req, res) => {
  const { query, country = "US", lang = "en_us" } = req.query;

  if (!query) return res.status(400).json({ error: "Query is required" });

  try {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=software&limit=10&country=${country}&lang=${lang}`;
    const response = await axios.get(url);

    const suggestions = response.data.results.map((item) => item.trackName);
    res.json({ suggestions });
  } catch (error) {
    res.status(500).json({ error: "App Store suggestion fetch failed", details: error.message });
  }
});

// /**
//  * ✅ Get Apps by Developer ID (Play Store)
//  */
// app.get("/developer", async (req, res) => {
//   const { devid } = req.query;
//   try {
//     const apps = await gplay.developer({ devId: devid });
//     res.json({ developer: devid, results: apps });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch developer apps", details: error.message });
//   }
// });

/**
 * ✅ Suggestion endpoint for Play Store
 * Expects: /suggest?term=insta
 */


// Playstore Suggestion Endpoint
app.get("/suggest", async (req, res) => {
  const { term } = req.query;

  if (!term) return res.status(400).json({ error: "Term is required" });

  try {
    const suggestions = await gplay.suggest({ term });
    res.json({ suggestion: term, results: suggestions });
  } catch (error) {
    console.error("Suggestion API Error:", error);
    res.status(500).json({ error: "Failed to fetch suggestions" });
  }
});

app.post("/playstore/category/", async (req, res) => {
  try {
    const { category, collection, country } = req.body;

    const result = await gplay.list({
      category: gplay.category[category],
      collection: gplay.collection[collection],
      country: country || "us",
      num: 10,
    });

    res.send(result);
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: e.toString() });
  }
});


app.get("/developer",async(req,res)=>{
   const{devid}=req.query;
   const apps= await gplay.developer({
      devId:devid
   });
   res.json({
      developer:devid,
      results:apps
   });
});
// app.get("/suggest", async (req, res) => {
//   const { term } = req.query;

//   try {
//     const suggestions = await gplay.suggest({ term }); // ✅ Correct key
//     res.json({
//       suggestion: term,
//       results: suggestions,
//     });
//   } catch (error) {
//     console.error("Suggestion API Error:", error);
//     res.status(500).json({ error: "Failed to fetch suggestions" });
//   }
// });

app.get("/reviews",async(req,res)=> {
   const {appid}= req.query;
   const apps= await gplay.reviews({
      appId:appid
   });
   res.json({
      reviews:appid ,
      results:apps
   });
})
app.get("/list", async (req, res) => {
  const {
    category = "APPLICATION",
    collection = "TOP_FREE",
    country = "us",
    lang = "en",
    num = 10
  } = req.query;
  
    const apps = await gplay.list({
      category: gplay.category[category],
      collection: gplay.collection[collection],
      country,
      lang,
      num: parseInt(num)
    });

    res.json({
      query: { category, collection, country, lang, num },
      results: apps
    });
  } );



 

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});




app.get("/list", async (req, res) => {
  const {
    category = "APPLICATION",
    collection = "TOP_FREE",
    country = "us",
    lang = "en",
    num = 10
  } = req.query;

 
    const apps = await gplay.list({
      category: gplay.category[category],
      collection: gplay.collection[collection],
      country,
      lang,
      num: parseInt(num)
    });

    res.json({
      query: { category, collection, country, lang, num },
      results: apps
    });
  } )
