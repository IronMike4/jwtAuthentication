const jwt = require("jsonwebtoken");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 8000;

// Allows us to parse the body of a request
app.use(bodyParser.json());

// User login
app.post("/login", (req, res) => {
  // Req.body is sent by the client
  const usr = req.body.username;
  const pwd = req.body.password;

  // Check if the provided username and password match the hardcoded values
  if (usr === "zama" && pwd === "abcdef") {
    // If the credentials are correct, create a payload for the JWT
    payload = {
      name: usr,
      admin: false,
    };
    // Sign the payload with the secret key to create a JWT
    const token = jwt.sign(JSON.stringify(payload), "jwt-secret", {
      algorithm: "HS256", // Use the HS256 algorithm for signing
    });
    // Send the generated JWT back to the client
    res.send({ token: token });
  } else {
    // If the credentials are incorrect, send a 403 Forbidden response
    res.status(403).send({ err: "Incorrect login!" });
  }
});

// Protected resource route
app.get("/resource", (req, res) => {
  // Extract the JWT from the Authorization header
  const auth = req.headers["authorization"];
  const token = auth.split(" ")[1];
  try {
    // Verify the JWT using the secret key
    const decoded = jwt.verify(token, "jwt-secret");
    // Send a response with a message including the username from the decoded token
    res.send({
      msg: `Hello, ${decoded.name}! Your JSON Web Token has been verified.`,
    });
  } catch (err) {
    // If the JWT is invalid, send a 401 Unauthorized response
    res.status(401).send({ err: "Bad JWT!" });
  }
});

// Admin-only resource route
app.get("/admin_resource", (req, res) => {
  // Extract the JWT from the Authorization header
  const token = req.headers["authorization"].split(" ")[1];
  try {
    // Verify the JWT using the secret key
    const decoded = jwt.verify(token, "jwt-secret");
    // Check if the user is an admin
    if (decoded.admin) {
      // If the user is an admin, send a success message
      res.send({ msg: "Success!" });
    } else {
      // If the user is not an admin, send a 403 Forbidden response
      res
        .status(403)
        .send({ msg: "Your JWT was verified, but you are not an admin." });
    }
  } catch (e) {
    // If the JWT is invalid, send a 401 Unauthorized response
    res.sendStatus(401);
  }
});

// Start the server and listen on the specified port
app.listen(PORT, () =>
  console.log(`Now listening at http://localhost:${PORT}`)
);
