const Food = require("../models/foodModel");

const foodCtrl = {
  getFoods: async (req, res) => {
    try {
      const foods = await Food.find({}).populate("category").exec();

      res.render("foods/foods", { foods: foods });
    } catch (err) {
      req.flash("error_msg", err.message);
      res.status(500).redirect("/foods");
    }
  },
  getFood: async (req, res) => {
    try {
      const id = req.params.id;
      const food = await Food.findById(id);

      res.render("foods/food", { food: food });
    } catch (err) {
      req.flash("error_msg", err.message);
      res.status(500).redirect("/foods");
    }
  },
  createFood: async (req, res) => {
    try {
      const { product_id, title, price, category } = req.body;

      const food = await Food.findOne({ product_id });
      if (food) {
        req.flash("error_msg", "Food already exist");
        return res.status(400).redirect("/foods/new");
      }

      const newFood = new Food({ product_id, title, price, category });
      await newFood.save();

      req.flash("success_msg", "Created food");
      res.status(201).redirect("/foods");
    } catch (err) {
      req.flash("error_msg", err.message);
      res.status(500).redirect("/foods/new");
    }
  },
  updateFood: async (req, res) => {
    try {
      const update = req.body;
      const id = req.params.id;
      await Food.findByIdAndUpdate(id, update);

      req.flash("success_msg", "Updated food");
      res.redirect("/foods");
    } catch (err) {
      req.flash("error_msg", err.message);
      res.status(500).redirect("/foods");
    }
  },
  deleteFood: async (req, res) => {
    try {
      await Food.findByIdAndDelete(req.params.id);

      req.flash("success_msg", "Deleted food");
      res.redirect("/foods");
    } catch (err) {
      req.flash("error_msg", err.message);
      res.status(500).redirect("/foods");
    }
  },
};

module.exports = foodCtrl;
