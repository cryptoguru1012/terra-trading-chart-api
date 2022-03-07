import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const main = async () => {
  var corsOptions = {
    origin: "*",
  };

  app.use(cors(corsOptions));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  /////////// Router ///////////
  var router = express.Router();

  router.get("/chartdata", async (req, res) => {
    fetch(
      "https://api.coinhall.org/api/v1/charts/terra/candles?from=1644962400&to=1644969600&interval=1h&pairAddress=terra106a00unep7pvwvcck4wylt4fffjhgkf9a0u6eu&quoteAsset=uusd"
    )
      .then((response) => response.json())
      .then((data) => {
        res.send(data);
      });
  });

  router.post("/chartdata", async (req, res) => {
    fetch(
      `https://api.coinhall.org/api/v1/charts/terra/candles?from=${req.body.from_time}&to=${req.body.to_time}&interval=${req.body.period}&pairAddress=terra106a00unep7pvwvcck4wylt4fffjhgkf9a0u6eu&quoteAsset=uusd`
    )
      .then((response) => response.json())
      .then((data) => {
        res.send(data);
      });
  });

  app.use("/api", router);
};

main().then(() => {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`API Server is running on port ${PORT}.`);
  });
});
