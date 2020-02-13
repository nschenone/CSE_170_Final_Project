var classes = require("../public/data/classes.json")

exports.view = function (req, res) {
  res.render('index', classes);
};