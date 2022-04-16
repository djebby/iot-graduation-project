import express from "express";
const app = express();
import { json } from "body-parser";


app.use(json());



app.listen(4000);