exports.viewClass = function (req, res) {
  var className = req.params.name;
  var classDescription = req.query.description;
  var classProfessor = req.query.professor;
  var classQuarter = req.query.quarter;

  res.render('class', { "className": className, "classDescription": classDescription, "classProfessor": classProfessor, "classQuarter": classQuarter });
};  