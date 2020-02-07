var classes = require("../public/data/classes.json")

exports.viewClass = function (req, res) {
  var className = req.params.name;
  res.render('class', { "className": className });
};