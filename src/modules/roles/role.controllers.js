const Role = require("./role.model");

exports.createRole = async (req, res) => {
  const role = await Role.create(req.body);
  res.json(role);
};

exports.getRoles = async (req, res) => {
  const roles = await Role.find();
  res.json(roles);
};
