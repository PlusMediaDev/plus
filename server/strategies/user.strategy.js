const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    /** @type {import("pg").QueryResult<Express.User>} */
    const { rows: users } = await pool.query(
      `
        SELECT
          "id",
          "email",
          "tokens",
          "last_uploaded_at" AS "lastUploadedAt"
        FROM "users"
        WHERE "id" = $1
      `,
      [id]
    );
    const user = users[0] || undefined;
    // User not found
    if (!user) {
      done(null, null);
      return;
    }

    done(null, user);
  } catch (err) {
    console.error("Failed to deserialize user:", err);
    done(err, null);
  }
});

/**
 * @param {string} email
 * @param {string} password
 * @param {(err: any, user?: Express.User) => void} done
 */
const verify = async (email, password, done) => {
  try {
    /** @type {import("pg").QueryResult<Express.User & { password: string }>} */
    const { rows: users } = await pool.query(
      `
        SELECT
          "id",
          "email",
          "password",
          "tokens",
          "last_uploaded_at" AS "lastUploadedAt"
        FROM "users"
        WHERE "email" = $1
      `,
      [email]
    );
    const user = users[0] || undefined;

    if (user && encryptLib.comparePassword(password, user.password)) {
      // Strip off password
      done(null, (({ password, ...user }) => user)(user));
    } else {
      done(null);
    }
  } catch (err) {
    console.error("User authentication error:", err);
    done(err);
  }
};

// Does actual work of logging in
passport.use("local", new LocalStrategy(verify));

module.exports = passport;
