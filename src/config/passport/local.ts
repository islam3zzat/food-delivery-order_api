import * as passport from 'passport';
import * as passportLocal from 'passport-local';
// import { User, UserType } from '../models/User';
import { default as User } from '../../models/User';
const LocalStrategy = passportLocal.Strategy;

// =========================================================================
// LOCAL SIGNUP ============================================================
// =========================================================================
// we are using named strategies since we have one for login and one for signup
// by default, if there was no name, it would just be called 'local'

passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({ email }, function(err: Error, user: {}) {
                // if there are any errors, return the error
                if (err)
                    return done(err);

                // check to see if theres already a user with that email
                if (user) {
                    return done(null, false, { message: 'user exists' });
                } else {
                    // if there is no user with that email
                    // create the user
                    const newUser = new User({
                        email,
                        password
                    });

                    // save the user
                    newUser.save(function(err: Error) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }

            });

        });

    }));
//
// /**
//  * Sign in using Email and Password.
//  */
passport.use('local-signin', new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email: email.toLowerCase() }, (err, user: any) => {
        if (err) { return done(err); }
        if (!user) {
            return done(undefined, false, { message: `Email ${email} not found.` });
        }
        user.comparePassword(password, (err: Error, isMatch: boolean) => {
            if (err) { return done(err); }
            if (isMatch) {
                return done(undefined, user);
            }
            return done(undefined, false, { message: 'Invalid email or password.' });
        });
    });
}));

