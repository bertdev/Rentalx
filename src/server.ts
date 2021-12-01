import express from "express";

const app = express();

app.get("/", (request, response) => {
  return response.json({ messsage: "opa amigo" });
});

app.listen(3000, () => console.log("server started"));
