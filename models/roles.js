const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  description: { type: String },
});

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
