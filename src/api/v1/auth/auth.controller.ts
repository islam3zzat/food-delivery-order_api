import { Response, Request, NextFunction } from 'express';
import { authUser } from '../../../utils/auth'

export function register (req: Request, res: Response, next: NextFunction) {
    authUser('local-signup', req, res, next)
}

export function login (req: Request, res: Response, next: NextFunction) {
    authUser('local-signin', req, res, next)
}
