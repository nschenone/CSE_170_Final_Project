exports.viewClass = function (req, res) {
  var className = req.params.name;
  var classDescription = req.query.description;
  var classProfessor = req.query.professor;
  var classQuarter = req.query.quarter;

  res.render('class', { "className": className, "classDescription": classDescription, "classProfessor": classProfessor, "classQuarter": classQuarter });
};

exports.viewClassTextbooks = function (req, res) {
  var className = req.params.name;
  var classDescription = req.query.description;
  var classProfessor = req.query.professor;
  var classQuarter = req.query.quarter;

  res.render('textbooks', { "className": className, "classDescription": classDescription, "classProfessor": classProfessor, "classQuarter": classQuarter });
};

exports.viewClassNotes = function (req, res) {
  var className = req.params.name;
  var classDescription = req.query.description;
  var classProfessor = req.query.professor;
  var classQuarter = req.query.quarter;

  res.render('classnotes', { "className": className, "classDescription": classDescription, "classProfessor": classProfessor, "classQuarter": classQuarter });
};

exports.viewClassPracticeExams = function (req, res) {
  var className = req.params.name;
  var classDescription = req.query.description;
  var classProfessor = req.query.professor;
  var classQuarter = req.query.quarter;

  res.render('practiceexams', { "className": className, "classDescription": classDescription, "classProfessor": classProfessor, "classQuarter": classQuarter });
};