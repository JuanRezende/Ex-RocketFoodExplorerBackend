const { Router } = require('express');
const multer = require('multer');
const uploadConfig = require('../configs/upload');

const checkAuthenticated = require('../middlewares/checkAuthenticated');
const checkIsAdmin = require("../middlewares/checkUserIsAdmin");
const ProductsController = require("../controllers/ProductsController")

const productsRoutes = Router();
const productsController = new ProductsController();

productsRoutes.use(checkAuthenticated);

const upload = multer(uploadConfig.MULTER);

productsRoutes.post("/", checkIsAdmin, upload.single("image"), productsController.create);
productsRoutes.put("/:id", checkIsAdmin, upload.single("image"), productsController.update);
productsRoutes.get("/:id", productsController.show);
productsRoutes.delete("/:id", checkIsAdmin, productsController.delete);
productsRoutes.get("/", productsController.index);

module.exports = productsRoutes;