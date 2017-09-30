import * as passport from 'passport';
import * as expressJwt from 'express-jwt';
export const authenticate = expressJwt({secret : 'shhhhhhhhh'});
import { Response, Request, NextFunction } from 'express';
import { sign } from './jwt'


export function authUser(strategy: string, req: Request, res: Response, next: NextFunction){
    passport.authenticate(strategy, function(err: Error, user: {}, info: {}) {
        if (err) { return next(err); }
        if (!user) {
            return res.status(400).json(info);
        }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            sign({id: req.user.id, email: req.user.email, password: req.user.password}, function (err: Error, token: string) {
                res.json({email: req.user.email, token});
            });
        });
    })(req, res, next);
}
