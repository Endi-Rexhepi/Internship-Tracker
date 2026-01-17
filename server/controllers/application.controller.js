const Application = require("../models/application.model");

module.exports.create = async (req, res) => {
  try {
    const created = await Application.create({ ...req.body, userId: req.userId });
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.getAll = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = { userId: req.userId };
    if (status) filter.status = status;

    const apps = await Application.find(filter).sort({ dateApplied: -1, createdAt: -1 });
    res.json(apps);
  } catch (err) {
    res.status(500).json(err);
  }
};


module.exports.getOne = async (req, res) => {
  try {
    const found = await Application.findById(req.params.id);
    if (!found) return res.status(404).json({ message: "Not found" });
    res.json(found);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.update = async (req, res) => {
  try {
    const updated = await Application.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.remove = async (req, res) => {
  try {
    const deleted = await Application.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json(err);
  }
};

