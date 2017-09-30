import * as jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';

type callback = (err: Error, payload: Object | string) => void ;

export function decode(token: string, cb: Object & callback) {
    jwt.verify(token, 'shhhhhhhhh', cb);
}


export function sign(paypload: Object, cb: Object & callback) {
    jwt.sign(paypload, 'shhhhhhhhh', cb);
}
