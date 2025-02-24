export let checkLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  if (req.path === "/all-cv" && !!req.user && req.user.role !== "ctrl-admin") {
    return res.redirect("");
  }
  next();
};

export let checkLoggedOut = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
};

export let postLogOut = (req, res) => {
  req.session.destroy(function (err) {
    // return res.redirect("/login");
    return res.json({ ok: true });
  });
};
