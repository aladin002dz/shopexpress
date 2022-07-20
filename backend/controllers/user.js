const connectdb = require("../db_connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  console.log("signing up!");
  console.log(req.body);
  const userData = req.body;
  bcrypt
    .hash(userData.pwd, 10)
    .then((hash) => {
      const email = userData.email;
      const password = hash;
      console.log(email);
      console.log(password);
      let sql = `INSERT INTO users (id, email, pwd) VALUES (NULL, '${email}', '${password}')`;
      let db = connectdb();
      db.all(sql, (err, rows) => {
        if (err) {
          console.log("Failed to create user!");
          res.status(400).json({
            error: err.message,
          });
        }
        console.log("Successfully created new user!");
        res.status(200).json({ message: "Successfully created new user!" });
      });
    })
    .catch((error) => {
      console.log("Failed to create user!");
      console.log(error);
      res.status(500).json({ error });
    });
};

exports.login = (req, res, next) => {
  /*************************************************************** */
  db = connectdb();

  console.log("Login");
  console.log("User data: ");
  console.log(req.body);
  const userData = req.body;

  let sql = `SELECT * FROM users WHERE email = '${userData.email}';`;
  db.all(sql, (err, rows) => {
    if (err) {
      res.status(400).json({
        error: err.message,
      });
    }

    /*------------------------------------------------------------*/
    //console.log(result);
    if (!rows[0]) {
      console.log("Email not found!");
      return res.status(401).json({ error: "Email not found!" });
    }

    bcrypt
      .compare(userData.pwd, rows[0].pwd)
      .then((valid) => {
        if (!valid) {
          console.log("not valid!");
          return res.status(401).json({ error: "Incorrect password!" });
        }
        console.log("valid!");
        return res.status(200).json({
          userId: rows[0].id,
          email: rows[0].email,
          token: jwt.sign({ userId: rows[0].id }, process.env.JWT_SECRET, {
            expiresIn: "24h",
          }),
        });
      })
      .catch((error) => res.status(500).json({ error }));
    /*------------------------------------------------------------*/
  });
  /*************************************************************** */
  db.close();
};
