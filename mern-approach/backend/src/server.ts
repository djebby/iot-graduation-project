import express from "express";
import { connect } from "mongoose";
import { json } from "body-parser";
import packageRoutes from "./routes/package-routes";
import authRoutes from "./routes/auth-routes";

const app = express();

app.use(json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api", packageRoutes);

// error handling middelware
app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction)=>{
  res.status(500).json({message: error.message});
});

connect("mongodb://localhost:27017/rapid_post")
  .then(() => {
    console.log("Connected Successfully to DB Server");
    app.listen(4000);
  })
  .catch((error) => {
    console.log(error.message);
  });
