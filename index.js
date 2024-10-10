import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import { yourUsername, yourPassword, yourAPIKey, yourBearerToken } from "./secrets.js";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

// https://axios-http.com/docs/post_example
// https://secrets-api.appbrewery.com/


const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

// The user submits the form (POST).
// http://localhost:3000/get-secret - form submission end-point
app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  //The server gets the id, makes a GET request to fetch data from the API.
  try {
    // API end-point is diferent
    const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/post-secret", async (req, res) => {


  
  try {
    // API end-point is diferent
    // After posting new content, secrets server will also return a data
    const result = await axios.post(API_URL + "/secrets",  req.body, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) }); 

  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/put-secret", async (req, res) => {
    const searchId = req.body.id;

    try {
      // API end-point is diferent
      // After posting new content, secrets server will also return a data
      const result = await axios.put(API_URL + "/secrets/", + searchId,  req.body, config);
      res.render("index.ejs", { content: JSON.stringify(result.data) }); 
  
    } catch (error) {
      res.render("index.ejs", { content: JSON.stringify(error.response.data) });
    }

});

app.post("/patch-secret", async (req, res) => {


    const searchId = req.body.id;


      
    try {

      const result = await axios.patch(
        API_URL + "/secrets/" + searchId, 
        req.body, 
        config
        );
      res.render("index.ejs", { content: JSON.stringify(result.data) }); 
  
    } catch (error) {
      res.render("index.ejs", { content: JSON.stringify(error.response.data) });
    }

});

app.post("/delete-secret", async (req, res) => {

    const searchId = req.body.id;

    try {
      const result = await axios.delete(API_URL + "/secrets/" + searchId, config);
      res.render("index.ejs", { content: JSON.stringify(result.data) }); 
  
    } catch (error) {
      res.render("index.ejs", { content: JSON.stringify(error.response.data) });
    }

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
