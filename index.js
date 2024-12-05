// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", (req, res) => {
  const date = req.params.date;
  console.log("INPUT", date);
  console.log(Date.parse(date));
  //API called without date => return current UNIX stamp and current UTC date string
  if (!date) {
    const unixDate = Date.now();
    const tempDate = new Date(unixDate);
    const utcDate = tempDate.toUTCString();
    return res.json({ unix: unixDate, utc: utcDate });
  } else if (!isNaN(Date.parse(date))) {
    //API CALLED WITH A DATE STRING
    const dateFromString = new Date(date);
    const unixDateFromString = dateFromString.valueOf();
    const utcDateFromString = dateFromString.toUTCString();
    //console.log({ unix: unixDateFromString.valueOf(), utc: utcDateFromString });
    return res.json({ unix: unixDateFromString, utc: utcDateFromString });
  } else {
    //API CALLED WITH A UNIX STRING
    const dateFromUnixString = new Date(Number(date));
    const utcDateFromUnixString = dateFromUnixString.toUTCString();
    if (utcDateFromUnixString !== "Invalid Date") {
      return res.json({
        unix: Number(date),
        utc: utcDateFromUnixString,
      });
    } else {
      //API CALLED WITH A FAULTY STRING
      return res.json({ error: utcDateFromUnixString });
    }
  }

  //   const dateFromString = new Date(Number(date));
  //   console.log(typeof dateFromString.toUTCString());
  //   console.log(dateFromString.toUTCString() === "Invalid Date");

  //   function isValidDate(dateString) {
  //     const timestamp = Date.parse(dateString);
  //     return !isNaN(timestamp);
  // }

  //   if (dateFromString.toUTCString() === "Invalid Date") {
  //     return res.json({ error: dateFromString.toUTCString() });
  //   } else {
  //     return res.json({ unix: date, utc: dateFromString.toUTCString() });
  //   }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
