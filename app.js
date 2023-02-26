const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/signup.html");
});
app.post("/", function(request, response) {
  const firstName = request.body.fname;
  const lastName = request.body.lname;
  const email = request.body.email;

  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
      }
    }]
  };
  const jsonData = JSON.stringify(data);

  const url = "https://us17.api.mailchimp.com/3.0/lists/c807335ca";
  const options = {
    method: "POST",
    auth: 
  }

  const req = https.request(url, options, function(res) {
    if (res.statusCode === 200) {
      response.sendFile(__dirname + "/success.html" );
    } else {
      response.sendFile(__dirname + "/failure.html" );
    }
    res.on("data", function(data) {
      console.log(JSON.parse(data));

    });
  });
  req.write(jsonData);
  req.end();
});
app.post("/failure", function(req , res) {
  res.redirect("/")
})
app.listen(3000, function() {
  console.log("server is running on port 3000.");
});
