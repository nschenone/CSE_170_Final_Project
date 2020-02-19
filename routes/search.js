exports.viewSearch = function (req, res) {
  db.query('SELECT * FROM my_classes;', (err, resp) => {
    classes = [];
    if (err) throw err;
    for (let row of resp.rows) {
      classes.push(row);
    }
    res.render('search', { "classes": classes });
  });
};