const express = require("express");
const router = express.Router();

const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

const productsCtrl = require("../controllers/products");

router.get("/", productsCtrl.getAllProducts);
//router.get("/", auth, productsCtrl.getAllProducts);

router.post("/", multer, productsCtrl.createProduct);
/*
router.delete("/:id", productsCtrl.deleteProduct);
router.product("/", multer, productsCtrl.createProduct);
router.get("/:id", productsCtrl.getOneProduct);
router.put("/:id", auth, multer, productsCtrl.modifySauce);

router.product("/:id/like", auth, productsCtrl.likeDislike);
*/
module.exports = router;
