var my_classes = require("../public/data/my_classes.json")
var all_classes = require("../public/data/all_classes.json")
const fs = require('fs');

exports.viewClass = function (req, res) {
  var className = req.params.name;
  var classDescription;
  var classProfessor;
  var classQuarter;

  for (var i = 0; i < all_classes.classes.length; i++) {
    if (all_classes.classes[i]["name"] == className) {
      classDescription = all_classes.classes[i]["description"];
      classProfessor = all_classes.classes[i]["professor"];
      classQuarter = all_classes.classes[i]["quarter"];
    }
  }
  res.render('class', { "className": className, "classDescription": classDescription, "classProfessor": classProfessor, "classQuarter": classQuarter });
};  