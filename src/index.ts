import * as dotenv from "dotenv";

import * as fs from "fs";
import * as http from "http";
import * as https from "https";
import * as express from "express";
import * as bodyParser from "body-parser";

// Init the server.
async function init(): Promise<http.Server> {
  const app = express();
  app.use(bodyParser.json());

  // Setup statuc assets.
  app.use(express.static("public"));

  // Setup routes.
  app.use((req: express.Request, res: express.Response) => {
    console.log("headers:", req.headers);
    console.log("body:", req.body);
    res.status(200).send("OK");
  });
  return https.createServer(
    {
      key: fs.readFileSync("server.key"),
      cert: fs.readFileSync("server.cert")
    },
    app
  );
}

if (require.main === module) {
  dotenv.config();
  init()
    .then(app => {
      const port = process.env.PORT || 5228;
      app.listen(port);
      console.log("server listening on", port);
    })
    .catch(console.error);
}
