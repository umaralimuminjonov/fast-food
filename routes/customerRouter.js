const router = require("express").Router();
const customerCtrl = require("../controllers/customerCtrl");

router
  .route("/customers")
  .get(customerCtrl.getCustomers)
  .post(customerCtrl.createCustomer);

router
  .route("/customers/:id")
  .put(customerCtrl.updateCustomer)
  .delete(customerCtrl.deleteCustomer);

module.exports = router;
