function proxy(app) {
  app.get(/\/$/, (req, res) => {
    console.log('in proxy');
    res.redirect('/discover');
  });
}

module.exports = proxy