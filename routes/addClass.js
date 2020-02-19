var my_classes = require("../public/data/my_classes.json")
var all_classes = require("../public/data/all_classes.json")

exports.addClass = function (req, res) {
  var className = req.params.name;
  // var classDescription = req.query.description;
  // var classProfessor = req.query.professor;
  // var classQuarter = req.query.quarter;

  var newClass = { "name": className, "description": classDescription, "professor": classProfessor, "quarter": classQuarter }

  my_classes.classes.push(newClass);

  res.render('myClasses', my_classes);
  // res.render('class/' + className, my_classes);
};