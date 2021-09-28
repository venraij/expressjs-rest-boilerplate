import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export default function(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    res.status(401).send({ error: 'Invalid token' });
    return;
  }

  jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
    console.log(err);

    if (err) {
      return res.status(403).send({ error: err });
    }

    req.headers.user = user;

    next();
  });
}
