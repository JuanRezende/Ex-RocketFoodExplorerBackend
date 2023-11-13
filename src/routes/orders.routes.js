const { Router } = require('express');

const OrdersController = require("../controllers/OrdersController")

const ordersController = new OrdersController();

const checkAuthenticated = require("../middlewares/checkAuthenticated");
const checkUserIsAdmin = require("../middlewares/checkUserIsAdmin");

const ordersRoutes = Router();

ordersRoutes.use(checkAuthenticated);

ordersRoutes.post("/", ordersController.create);
ordersRoutes.get("/", checkUserIsAdmin, ordersController.index);
ordersRoutes.put("/", checkUserIsAdmin, ordersController.update);

module.exports = ordersRoutes;