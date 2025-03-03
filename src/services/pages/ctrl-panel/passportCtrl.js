import passportLocal from "passport-local";
import passport from "passport";
import {
  findUserById,
  findUserByEmail,
  comparePassword,
} from "./user_db.js";

let LocalStrategy = passportLocal.Strategy;
export let Authenticate = (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    switch (req.accepts("html", "json")) {
      case "html":
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.redirect("/ctrl-panel/login");
        }
        req.logIn(user, function (err) {
          
          if (err) {
            return next(err);
          }
          return res.redirect("/ctrl-panel/");
        });
        break;
      case "json":
        if (err) {
          return next(err);
        }
        if (!user) {
          console.log("Kullunıcı bulunamadı" );
          return res
            .status(401)
            .json({ ok: false, msg: "Kullunıcı bulunamadı" });
        }
        req.logIn(user, function (err) {
          if (err) {
            return res
              .status(401)
              .json({ ok: false, msg: "Email veya şifre hatalı" });
          }
          return res.json({ ok: true });
        });
        break;
      default:
        res.status(406).json();
    }
  })(req, res, next);
};
export let initPassportLocal = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "passw",
        passReqToCallback: true,
      },
      async (req, email, passw, done) => {
        try {
          await findUserByEmail(email).then(async (user) => {
            if (!user) {
              return done(
                null,
                false,
                req.flash("errors", `This user email "${email}" doesn't exist`)
              );
            }
            if (user) {
              let match = await comparePassword(passw, user);
              if (match === true) {
                return done(null, user, null);
              } else {
                return done(null, false, req.flash("errors", match));
              }
            }
          });
        } catch (err) {
          console.log(err);
          return done(null, false, { message: err });
        }
      }
    )
  );
};

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  findUserById(id)
    .then((user) => {
      return done(null, user);
    })
    .catch((error) => {
      return done(error, null);
    });
});
