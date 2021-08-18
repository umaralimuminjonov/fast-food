const Category = require("../models/categoryModel");

const categoryCtrl = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find({});

      res.render("category/categories", { categories: categories });
    } catch (err) {
      req.flash("error_msg", err.message);
      res.status(500).redirect("/category");
    }
  },
  getCategory: async (req, res) => {
    try {
      const id = req.params.id;
      const category = await Category.findById(id);

      res.render("category/category", { category: category });
    } catch (err) {
      req.flash("error_msg", err.message);
      res.status(500).redirect("/category");
    }
  },
  createCategory: async (req, res) => {
    try {
      const { name } = req.body;

      const category = await Category.findOne({ name });
      if (category) {
        req.flash("error_msg", "Category already exist");
        return res.status(400).redirect("/category/new");
      }

      const newCategory = new Category({ name });
      await newCategory.save();

      req.flash("success_msg", "Created category");
      res.status(201).redirect("/category");
    } catch (err) {
      req.flash("error_msg", err.message);
      res.status(500).redirect("/category/new");
    }
  },
  updateCategory: async (req, res) => {
    try {
      const update = req.body;
      const id = req.params.id;
      await Category.findByIdAndUpdate(id, update);

      req.flash("success_msg", "Updated category");
      res.redirect("/category");
    } catch (err) {
      req.flash("error_msg", err.message);
      res.status(500).redirect("/category/" + req.params.id + "/update");
    }
  },
  deleteCategory: async (req, res) => {
    try {
      await Category.findByIdAndDelete(req.params.id);

      req.flash("success_msg", "Deleted category");
      res.redirect("/category");
    } catch (err) {
      req.flash("error_msg", err.message);
      res.status(500).redirect("/category");
    }
  },
};

module.exports = categoryCtrl;
