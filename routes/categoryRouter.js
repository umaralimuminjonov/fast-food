const router = require("express").Router();
const categoryCtrl = require("../controllers/categoryCtrl");
const { checkAuthenticated } = require("../config/auth");

router.get("/category", categoryCtrl.getCategories);
router.get("/category/:id/show", categoryCtrl.getCategory);

router
  .route("/category/new")
  .get((req, res) => res.render("category/newCategory"))
  .post(categoryCtrl.createCategory);

router
  .route("/category/:id/update")
  .get((req, res) => {
    res.render("category/updateCategory", { id: req.params.id });
  })
  .post(categoryCtrl.updateCategory);

router.get("/category/:id/delete", categoryCtrl.deleteCategory);

module.exports = router;
