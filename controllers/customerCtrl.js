const Customers = require("../models/customerModel");

const customersCtrl = {
  getCustomers: async (req, res) => {
    try {
      const customers = await Customers.find({});
      res.render("customers", {customers: customers})
      res.json(customers);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  createCustomer: async (req, res) => {
    try {
      const { name, phone, username } = req.body;
      const customer = await Customers.findOne({ phone });
      if (customer) return res.status(400).json({ msg: "User already exist." });

      const newCustomer = new Customers({ name, phone, username });

      await newCustomer.save();
      res.status(201).json({ newCustomer, msg: "Created customer" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  updateCustomer: async (req, res) => {
    try {
      const user = await Customers.findById(req.params.id);
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      const update = req.body;
      const id = user._id;
      await Customers.findByIdAndUpdate(id, update);
      const customer = await Customers.findById(id);

      res.json({ customer, msg: "Updated customer" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  deleteCustomer: async (req, res) => {
    try {
      await Customers.findByIdAndDelete(req.params.id);

      res.json({ msg: "Deleted customer" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = customersCtrl;
