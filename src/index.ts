import * as express from "express";
import * as cors from "cors";
import * as cookieParser from "cookie-parser";

const app = express();
app.use(cors());
app.use(cookieParser());

app.get("/set", (req, res) => {
  res
    .cookie("hello", "world", {
      httpOnly: true
    })
    .send("added");
});

app.get("/get", (req, res) => {
  res.send(req.cookies);
});

app.listen(8888);
