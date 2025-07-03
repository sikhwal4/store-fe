import express from 'express';
import gplay from 'google-play-scraper';

const app = express();

app.get("/apps/:id", async (req, res) => {
    const appId = req.params.id;

     try {
         const appDetails = await gplay.app({ appId });
        res.json(appDetails);
     } catch (err) {
        res.status(404).json({ error: "App not found", message: err.message });
     } });

 app.listen(3000, () => {
     console.log("🚀 Server is running at http://localhost:3000");
 });

// import express from 'express';
// import gplay from 'google-play-scraper';

// const app =express();
// app.post('/students',(req,res)=>{
//   res.json ({message:"success",data:res.body})  
//     const data= req.body;
//     console.log(data);

// } );  
//     app.listen(3000, () => {
//       console.log("🚀 Server is running at http://localhost:3000");
// });
