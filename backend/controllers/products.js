const connectdb = require("../db_connection");
const fs = require("fs");

/* function requete(db, sql) {
  function runQueries(db) {
    db.all(sql, (err, rows) => {
      if (err) {
        res.status(400).json({
          error: err.message,
        });
        return;
      }
      return rows;
    });
  }

  return runQueries(db);
} */

exports.getAllProducts = (req, res, next) => {
  let db = connectdb();
  console.log("getting all products!");

  db.all("SELECT * FROM products", (err, rows) => {
    if (err) {
      res.status(400).json({
        error: err.message,
      });
    }
    res.status(200).json(rows);
  });
  db.close();
};

exports.createProduct = (req, res, next) => {
  let db = connectdb();
  console.log(req.body);
  postData = JSON.parse(req.body.postData);
  let imageUrl = "";
  if (req.files[0]) {
    imageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.files[0].filename
    }`;
  }

  let sql = `INSERT INTO posts (description, price, imgUrl) VALUES ( '${postData.description}', ${postData.price}, '${imageUrl}')`;

  try {
    db.run(sql);
    console.log("Post successfully added!");
    db.all("SELECT * FROM posts", (err, rows) => {
      if (err) {
        res.status(400).json({
          error: err.message,
        });
      }
      res.status(200).json(rows);
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }

  db.close();
};

exports.modifyProduct = (req, res, next) => {};

exports.deleteProduct = (req, res, next) => {
  const _id = req.params.id;
  let sql = `SELECT * FROM products WHERE id = ${_id};`;
  connectdb.query(sql, function (err, resultsOneProduct, fields) {
    if (err)
      res.status(400).json({
        error: err,
      });
    console.log("post found");

    try {
      const filename = resultsOnePost[0].imgUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        sql = `DELETE FROM products WHERE products.id = ${_id}`;
        connectdb.query(sql, function (err, result, fields) {
          if (err) res.status(400).json({ message: err });
          console.log("product deleted");
          let sql = "SELECT * FROM products";
          connectdb.query(sql, function (errGetAll, resultGetAll, fields) {
            if (errGetAll)
              res.status(400).json({
                error: errGetAll,
              });
            res.status(200).json(resultGetAll);
          });
        });
      });
    } catch (err) {
      sql = `DELETE FROM products WHERE products.id = ${_id}`;
      connectdb.query(sql, function (err, result, fields) {
        if (err) res.status(400).json({ message: err });
        console.log("post deleted");
        let sql = "SELECT * FROM products";
        connectdb.query(sql, function (errGetAll, resultGetAll, fields) {
          if (errGetAll)
            res.status(400).json({
              error: errGetAll,
            });
          res.status(201).json(resultGetAll);
        });
      });
    }
  });
};
