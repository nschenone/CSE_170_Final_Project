var classes = require("../public/data/my_classes.json")

exports.view = function (req, res) {
  res.render('myClasses', classes);
};