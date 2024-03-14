import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      `https://bored-api.appbrewery.com/filter?type=${type}&participnats=${participants}`);
    const result = response.data;
    console.log(result);
    res.render("index.ejs", {
      data: result[Math.floor(Math.random() * result.length)]
     });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: "No actitities that match your criteria.",
    });
  }
});

app.post("/", async (req, res) => {
  console.log(req.body);
  
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
