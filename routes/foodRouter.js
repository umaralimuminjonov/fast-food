const router = require("express").Router();
const foodCtrl = require("../controllers/foodCtrl");
const Category = require("../models/categoryModel");


router.get("/foods", foodCtrl.getFoods);
router.get("/foods/:id/show", foodCtrl.getFood);

router
  .route("/foods/new")
  .get(async (req, res) => {
    const categories = await Category.find({});
    res.render("foods/newFood", { categories: categories });
  })
  .post(foodCtrl.createFood);

router
  .route("/foods/:id/update")
  .get(async (req, res) => {
    const categories = await Category.find({});
    res.render("foods/updateFood", {
      id: req.params.id,
      categories: categories,
    });
  })
  .post(foodCtrl.updateFood);

router.get("/foods/:id/delete", foodCtrl.deleteFood);

module.exports = router;
