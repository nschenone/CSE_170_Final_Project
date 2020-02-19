exports.viewSearch = function (req, res) {

  // db.query('SELECT * FROM all_classes;', (err, res) => {
  //   if (err) throw err;
  //   for (let row of res.rows) {
  //     console.log(JSON.stringify(row));
  //   }
  // });

  res.render('search');
};