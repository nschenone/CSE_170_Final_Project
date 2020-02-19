var orig_classes = require("../public/data/all_classes.json")

exports.view = function (req, res) {
  db.query('SELECT * FROM my_classes;', (err, resp) => {
    classes = [];
    if (err) throw err;
    for (let row of resp.rows) {
      classes.push(row);
    }
    res.render('myClasses', { "classes": classes });
  });
};