var classes = require("../public/data/classes.json")

exports.view = function (req, res) {
  console.log(classes);
  res.render('index', classes);
};