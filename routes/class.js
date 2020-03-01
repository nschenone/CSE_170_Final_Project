exports.viewClass = function (req, res) {
  var className = req.params.name;
  var classDescription = req.query.description;
  var classProfessor = req.query.professor;
  var classQuarter = req.query.quarter;

  res.render('class', { "className": className, "classDescription": classDescription, "classProfessor": classProfessor, "classQuarter": classQuarter });
};

exports.viewClassTextbooksA = function (req, res) {
  var className = req.params.name;
  var classDescription = req.query.description;
  var classProfessor = req.query.professor;
  var classQuarter = req.query.quarter;

  res.render('textbooksA', { "className": className, "classDescription": classDescription, "classProfessor": classProfessor, "classQuarter": classQuarter });
};

exports.viewClassTextbooksB = function (req, res) {
  var className = req.params.name;
  var classDescription = req.query.description;
  var classProfessor = req.query.professor;
  var classQuarter = req.query.quarter;

  res.render('textbooksB', { "className": className, "classDescription": classDescription, "classProfessor": classProfessor, "classQuarter": classQuarter });
};

exports.viewClassNotes = function (req, res) {
  var className = req.params.name;
  var classDescription = req.query.description;
  var classProfessor = req.query.professor;
  var classQuarter = req.query.quarter;

  res.render('classNotes', { "className": className, "classDescription": classDescription, "classProfessor": classProfessor, "classQuarter": classQuarter });
};

exports.viewClassPracticeExams = function (req, res) {
  var className = req.params.name;
  var classDescription = req.query.description;
  var classProfessor = req.query.professor;
  var classQuarter = req.query.quarter;

  res.render('practiceExams', { "className": className, "classDescription": classDescription, "classProfessor": classProfessor, "classQuarter": classQuarter });
};