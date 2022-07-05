const connectdb = require("../db_connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//const User = require("../models/User");

exports.signup = (req, res, next) => {
  console.log("signing up!");
  console.log(req.body);
  console.log(req.body.userData);
  const userData = JSON.parse(req.body.userData);
  bcrypt
    .hash(userData.pwd, 10)
    .then((hash) => {
      const email = userData.email;
      const password = hash;
      console.log(email);
      console.log(password);
      let sql = `INSERT INTO users (id, email, pwd) VALUES (NULL, '${email}', '${password}')`;

      connectdb.all(sql, (err, rows) => {
        if (err) {
          console.log("Utilisateur crée avec succés!");
          res.status(400).json({
            error: err.message,
          });
        }
        console.log("Utilisateur crée avec succés!");
        res.status(200).json({ message: "Utilisateur crée avec succés!" });
      });
    })
    .catch((error) => res.status(500).json({ error }));
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
      console.log("utilisateur non trouvé!");
      return res.status(401).json({ error: "Utilisateur non trouvé !" });
    }

    bcrypt
      .compare(userData.pwd, rows[0].pwd)
      .then((valid) => {
        if (!valid) {
          console.log("not valid!");
          return res.status(401).json({ error: "Mot de passe incorrect !" });
        }
        console.log("valid!");
        return res.status(200).json({
          userId: rows[0].id,
          email: rows[0].email,
          token: jwt.sign({ userId: rows[0].id }, "RANDOM_TOKEN_SECRET", {
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
